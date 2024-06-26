import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  private lastPartMap = new Map([
    [581, 'النبأ'],
    [582, 'النازعات'],
    [583, 'عبس'],
    [584, 'تكوير'],
    [585, 'الانفطار'],
    [586, 'المططفين'],
    [587, 'الانشقاق'],
    [588, 'البروج'],
    [589, 'الطارق'],
    [590, 'الأعلى'],
    [591, 'الغاشية'],
    [592, 'الفجر'],
    [593, 'البلد'],
    [594, 'الشمس'],
    [595, 'الليل'],
    [596, 'الضحى'],
    [597, 'الشرح'],
    [598, 'التين'],
    [599, 'العلق'],
    [600, 'القدر'],
    [601, 'البينة'],
    [602, 'الزلزلة'],
    [603, 'العاديات'],
    [604, 'القارعة'],
    [605, 'التكاثر'],
    [606, 'العصر'],
    [607, 'الهمزة'],
    [608, 'الفيل'],
    [609, 'قريش'],
    [610, 'الماعون'],
    [611, 'الكوثر'],
    [612, 'الكافرون'],
    [613, 'النصر'],
    [614, 'المسد'],
    [615, 'الإخلاص'],
    [616, 'الفلق'],
    [617, 'الناس'],
  ]);

  transform(value: number) {
    if (value < 0) return 'INVALID';

    if (value <= 580) return String(value + 1);
    return this.lastPartMap.get(value) ?? 'INVALID';
  }
}
