from django.urls import path
from quizz import views

urlpatterns = [
    path("login", views.LoginQuizzAccountView.as_view(), name="quizz_login_view"),
    path("current-account", views.CurrentQuizzAccountView.as_view(), name="quizz_current_account_view"),
    path("subject", views.QuizzSubjectListView.as_view(), name="quizz_subject_list_view"),
    path("session/<int:id>", views.QuizzSessionView.as_view(), name="quizz_session_view"),
    path("submit-session-answer", views.QuizzSessionSubmitAnswerView.as_view(), name="quizz_submit_session_answer_view")
]
