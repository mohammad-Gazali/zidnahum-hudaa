run:
	@python ./backend/manage.py runserver

migrate:
	@python ./backend/manage.py migrate

migrations:
	@python ./backend/manage.py makemigrations

test:
	@python -W ignore::RuntimeWarning ./backend/manage.py test ./backend

shell:
	@python ./backend/manage.py shell

build:
	@python ./backend/manage.py build
	@python ./backend/manage.py collectstatic