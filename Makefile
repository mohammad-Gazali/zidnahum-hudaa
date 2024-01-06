run:
	@python manage.py runserver

migrate:
	@python manage.py migrate

migrations:
	@python manage.py makemigrations

test:
	@python manage.py test