from quizz.models import QuizzAccount

# TODO: handle via session
def get_quizz_account(_):
    return QuizzAccount.objects.first()