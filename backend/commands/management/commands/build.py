from django.core.management.base import BaseCommand
from pathlib import Path
import os
import shutil

class Command(BaseCommand):
    def handle(self, *args, **options):
        shutil.rmtree(Path.cwd() / "backend" / "templates", ignore_errors=True)
        shutil.rmtree(Path.cwd() / "backend" / "static", ignore_errors=True)
        shutil.rmtree(Path.cwd() / "backend" / "staticfiles", ignore_errors=True)

        os.makedirs(Path.cwd() / "backend" / "templates")
        os.makedirs(Path.cwd() / "backend" / "static")

        os.chdir(Path.cwd() / "frontend" / "new-frontend")
        os.system("ng build")

        os.chdir(Path.cwd() / ".." / "..")

        shutil.move(
            Path.cwd() / "frontend" / "new-frontend" / "dist" / "browser" / "index.html",
            Path.cwd() / "backend" / "templates" / "index.html",
        )

        shutil.copytree(
            Path.cwd() / "frontend" / "new-frontend" / "dist" / "browser",
            Path.cwd() / "backend" / "static",
            dirs_exist_ok=True,
        )

        with open(Path.cwd() / "backend" / "templates" / "index.html", "r+") as file:
            new_content = (
                file.read()
                .replace("assets/fonts/fonts.css", "static/assets/fonts/fonts.css")
                .replace("favicon.ico", "static/favicon.ico")
            )
            file.seek(0)
            file.write(new_content)

        for filename in os.listdir(Path.cwd() / "backend" / "static"):
            if filename.startswith("main"):
                with open(Path.cwd() / "backend" / "static" / filename, "r+") as file:
                    new_content = (
                        file.read()
                        .replace("assets/logo.svg", "static/assets/logo.svg")
                        .replace("assets/logo-dark.svg", "static/assets/logo-dark.svg")
                    )
                    file.seek(0)
                    file.write(new_content)
