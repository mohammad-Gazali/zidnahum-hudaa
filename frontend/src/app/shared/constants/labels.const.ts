import { MasjedEnum, MessageTypeEnum, StudentLevelEnum } from '../services/api/models';
import { EXTRA_HADEETH_LABEL } from './extra-hadeeth.const';

export const STUDENT_LEVEL_LABELS: Record<StudentLevelEnum, string> = {
  [StudentLevelEnum.ONE]: 'المستوى الأول',
  [StudentLevelEnum.TWO]: 'المستوى الثاني',
  [StudentLevelEnum.THREE]: 'المستوى الثالث',
};

export const MASJED_LABELS: Record<MasjedEnum, string> = {
  [MasjedEnum.HASANIN]: 'الحسنين',
  [MasjedEnum.SALAM]: 'السلام',
  [MasjedEnum.QAZZAZ]: 'القزاز',
  [MasjedEnum.KHANSAA]: 'الخنساء',
};

export const MESSAGE_TYPE_LABELS: Record<MessageTypeEnum, string> = {
  [MessageTypeEnum.MEMO]: 'تسميع غيباً',
  [MessageTypeEnum.TEST]: 'سبر',
  [MessageTypeEnum.ALNAWAWIA]: 'الأربعين النووية',
  [MessageTypeEnum.ALSAALIHIN]: 'رياض الصالحين',
  [MessageTypeEnum.ALLAH_NAMES]: 'أسماء الله الحسنى',
  [MessageTypeEnum.ELITE_TEST]: 'سبر الأحزاب',
  [MessageTypeEnum.VIEWING]: 'قراءة القرآن نظراً',
  [MessageTypeEnum.EXTRA_HADEETH]: EXTRA_HADEETH_LABEL,
};
