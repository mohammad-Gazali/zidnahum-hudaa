import { StudentLevel } from '../types/student-level.enum';
import { Masjed } from '../types/masjed.enum';
import { MessageType } from '../types/message-type.enum';
import { EXTRA_HADEETH_LABEL } from './extra-hadeeth.const';

export const STUDENT_LEVEL_LABELS: Record<StudentLevel, string> = {
  [StudentLevel.ONE]: 'المستوى الأول',
  [StudentLevel.TWO]: 'المستوى الثاني',
  [StudentLevel.THREE]: 'المستوى الثالث',
};

export const MASJED_LABELS: Record<Masjed, string> = {
  [Masjed.AlHussinin]: 'الحسنين',
  [Masjed.AlSalam]: 'السلام',
  [Masjed.AlQazzaz]: 'القزاز',
  [Masjed.AlKhansaa]: 'الخنساء',
};

export const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  [MessageType.Memo]: 'تسميع غيباً',
  [MessageType.Test]: 'سبر',
  [MessageType.AlNawawia]: 'الأربعين النووية',
  [MessageType.AlSaalihin]: 'رياض الصالحين',
  [MessageType.AllahNames]: 'أسماء الله الحسنى',
  [MessageType.Parts]: 'سبر الأحزاب',
  [MessageType.Viewing]: 'قراءة القرآن نظراً',
  [MessageType.ExtraHadeeth]: EXTRA_HADEETH_LABEL,
};
