import re
from collections.abc import MutableMapping, MutableSequence

from students.models import MessageTypeChoice, StudentLevelChoice, StudentMasjedChoice

ENUM_OVERRIDES = {
  "MasjedEnum": StudentMasjedChoice,
  "StudentLevelEnum": StudentLevelChoice,
  "MessageTypeEnum": MessageTypeChoice,
}


def _iter_dicts(node):
  if isinstance(node, MutableMapping):
    yield node
    for value in node.values():
      yield from _iter_dicts(value)
  elif isinstance(node, MutableSequence):
    for item in node:
      yield from _iter_dicts(item)


def _strip(name):
  return re.sub(r"[^a-zA-Z0-9]", " ", name).strip().title().replace(" ", "")


def disambiguate_duplicate_schema_names(result, generator, request, public):
  """orval lowers/strips non-alnum schema names to a file name, so hyphenated
  action variants (e.g. `Student-details`) collide with their camel siblings
  (`StudentDetails`) and silently overwrite generated models. Rename variants
  that would map to an existing component to `<stripped>Admin`."""
  schemas = result.get("components", {}).get("schemas", {})
  existing = {_strip(name).lower(): name for name in schemas}

  renames = {}
  for name in list(schemas):
    if "-" not in name:
      continue
    key = _strip(name).lower()
    sibling = existing.get(key)
    if sibling and sibling != name:
      renames[name] = "Admin" + _strip(name)

  taken = set(schemas)
  for name, new in list(renames.items()):
    while new in taken:
      new += "Admin"
    renames[name] = new
    taken.add(new)

  if not renames:
    return result

  for old, new in renames.items():
    schemas[new] = schemas.pop(old)

  for node in list(_iter_dicts(result)):
    ref = node.get("$ref")
    if isinstance(ref, str) and ref.startswith("#/components/schemas/"):
      target = ref.rsplit("/", 1)[1]
      if target in renames:
        node["$ref"] = f"#/components/schemas/{renames[target]}"

  return result


def set_enum_varnames(result, generator, request, public):
  schemas = result.setdefault("components", {}).setdefault("schemas", {})
  component_ids = {id(value) for value in schemas.values()}

  enum_by_values = {tuple(member.value for member in choices): name for name, choices in ENUM_OVERRIDES.items()}

  for node in list(_iter_dicts(result)):
    if id(node) in component_ids:
      continue
    values = node.get("enum")
    if not isinstance(values, list) or not values:
      continue
    if node.get("type") not in ("integer", "string", "number"):
      continue
    name = enum_by_values.get(tuple(values))
    if name is None:
      continue
    if name not in schemas:
      schemas[name] = {
        "type": "integer",
        "enum": values,
        "x-enum-varnames": [member.name for member in ENUM_OVERRIDES[name]],
      }
    node.clear()
    node["$ref"] = f"#/components/schemas/{name}"

  for name, choices in ENUM_OVERRIDES.items():
    schema = schemas.get(name)
    if schema and "enum" in schema:
      schema["x-enum-varnames"] = [member.name for member in choices]

  return result