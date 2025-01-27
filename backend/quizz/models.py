from django.db import models
from django.contrib.sessions.models import Session

class QuizzAccount(models.Model):
    student = models.OneToOneField("students.Student", on_delete=models.PROTECT, verbose_name="الطالب")
    password = models.CharField(max_length=6, verbose_name="كلمة المرور")
    session = models.OneToOneField(Session, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "حساب اختبار"
        verbose_name_plural = "حسابات اختبارات"


class QuizzSubject(models.Model):
    name = models.CharField(max_length=40, unique=True, verbose_name="الاسم")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "مادة اختبار"
        verbose_name_plural = "مواد الاختبارات"


class QuizzLevel(models.IntegerChoices):
    FIRST = 1, "First"
    SECOND = 2, "Second"
    THIRD = 3, "Third"


class QuizzQuestion(models.Model):
    body = models.TextField(verbose_name="نص السؤال")
    level = models.IntegerField(choices=QuizzLevel.choices, verbose_name="مستوى السؤال")
    subject = models.ForeignKey(QuizzSubject, on_delete=models.CASCADE)
    right_choice = models.TextField(verbose_name="الاختيار الصحيح")
    wrong_choice1 = models.TextField(verbose_name="اختيار خاطئ 1")
    wrong_choice2 = models.TextField(verbose_name="اختيار خاطئ 2")
    wrong_choice3 = models.TextField(verbose_name="اختيار خاطئ 3")

    class Meta:
        verbose_name = "سؤال اختبار"
        verbose_name_plural = "أسئلة الاختبارات"


class PassedQuizz(models.Model):
    account = models.ForeignKey(QuizzAccount, on_delete=models.PROTECT, verbose_name="الحساب")
    subject = models.ForeignKey(QuizzSubject, on_delete=models.PROTECT, verbose_name="المادة")
    level = models.IntegerField(choices=QuizzLevel.choices, verbose_name="مستوى السؤال")

    class Meta:
        verbose_name = "اختبار ناجح"
        verbose_name_plural = "اختبارات ناجحة"