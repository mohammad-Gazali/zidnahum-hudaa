from django.db.models.signals import pre_delete
from django.dispatch import receiver
from students.models import MemorizeMessage, MessageTypeChoice
from students.constants import NON


@receiver(pre_delete, sender=MemorizeMessage)
def pre_delete_message(sender, instance: MemorizeMessage, **kwargs):
    student = instance.student

    if instance.message_type == MessageTypeChoice.MEMO:
        for item in instance.changes:
            student.q_memorizing[item] = NON
        student.save()

    elif instance.message_type == MessageTypeChoice.TEST:
        for item in instance.changes:
            student.q_test[item] = NON
        student.save()

    elif instance.message_type == MessageTypeChoice.ALNAWAWIA:
        student.alarbaein_alnawawia_new = instance.changes[1]
        student.save()

    elif instance.message_type == MessageTypeChoice.ALSAALIHIN:
        student.riad_alsaalihin_new = instance.changes[1]
        student.save()

    elif instance.message_type == MessageTypeChoice.ALLAH_NAMES:
        student.allah_names_new = False
        student.save()

    elif instance.message_type == MessageTypeChoice.ELITE_TEST:
        for item in instance.changes:
            student.q_elite_test[item] = NON
        student.save()