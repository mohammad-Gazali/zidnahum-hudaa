run:
	@python ./backend/manage.py runserver

migrate:
	@python ./backend/manage.py migrate

migrations:
	@python ./backend/manage.py makemigrations

test:
	@python ./backend/manage.py test ./backend

shell:
	@python ./backend/manage.py shell