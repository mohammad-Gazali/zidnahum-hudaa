from django.db.models.signals import pre_delete
from django.dispatch import receiver
from students.models import MemorizeMessage, MessageTypeChoice
from students.constants import NON


# TODO: test
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
        pass

    elif instance.message_type == MessageTypeChoice.ALSAALIHIN:
        pass

    elif instance.message_type == MessageTypeChoice.ALLAH_NAMES:
        pass