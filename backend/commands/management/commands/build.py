import os
import shutil
from pathlib import Path

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        shutil.rmtree(Path.cwd() / "backend" / "templates", ignore_errors=True)
        shutil.rmtree(Path.cwd() / "backend" / "static", ignore_errors=True)
        shutil.rmtree(Path.cwd() / "backend" / "staticfiles", ignore_errors=True)

        os.makedirs(Path.cwd() / "backend" / "templates")
        os.makedirs(Path.cwd() / "backend" / "static")

        os.chdir(Path.cwd() / "frontend")
        os.system("ng build")

        os.chdir(Path.cwd() / "..")

        shutil.move(
            Path.cwd() / "frontend" / "dist" / "frontend" / "browser" / "index.html",
            Path.cwd() / "backend" / "templates" / "index.html",
        )

        shutil.copytree(
            Path.cwd() / "frontend" / "dist" / "frontend" / "browser",
            Path.cwd() / "backend" / "static",
            dirs_exist_ok=True,
        )

        with open(Path.cwd() / "backend" / "templates" / "index.html", "r+") as file:
            new_content = (
                file.read()
                .replace("fonts/fonts.css", "static/fonts/fonts.css")
                .replace("favicon.ico", "static/favicon.ico")
            )
            file.seek(0)
            file.write(new_content)

        for filename in os.listdir(Path.cwd() / "backend" / "static"):
            if filename.endswith(".js"):
                with open(Path.cwd() / "backend" / "static" / filename, "r+") as file:
                    new_content = (
                        file.read()
                        .replace("logo.svg", "static/logo.svg")
                        .replace("logo-dark.svg", "static/logo-dark.svg")
                    )
                    file.seek(0)
                    file.write(new_content)
