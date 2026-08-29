import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class QuranMemorzieService {
    public transform(index: number): string {
        if (index < 0) return 'INVALID';
        
        if (index <= 580) return String(index + 1);

        switch (index) {
            case 581: return 'النبأ'
            case 582: return 'النازعات'
            case 583: return 'عبس'
            case 584: return 'تكوير'
            case 585: return 'الانفطار'
            case 586: return 'المططفين'
            case 587: return 'الانشقاق'
            case 588: return 'البروج'
            case 589: return 'الطارق'
            case 590: return 'الأعلى'
            case 591: return 'الغاشية'
            case 592: return 'الفجر'
            case 593: return 'البلد'
            case 594: return 'الشمس'
            case 595: return 'الليل'
            case 596: return 'الضحى'
            case 597: return 'الشرح'
            case 598: return 'التين'
            case 599: return 'العلق'
            case 600: return 'القدر'
            case 601: return 'البينة'
            case 602: return 'الزلزلة'
            case 603: return 'العاديات'
            case 604: return 'القارعة'
            case 605: return 'التكاثر'
            case 606: return 'العصر'
            case 607: return 'الهمزة'
            case 608: return 'الفيل'
            case 609: return 'قريش'
            case 610: return 'الماعون'
            case 611: return 'الكوثر'
            case 612: return 'الكافرون'
            case 613: return 'النصر'
            case 614: return 'المسد'
            case 615: return 'الإخلاص'
            case 616: return 'الفلق'
            case 617: return 'الناس'
            default: return 'INVALID'
        }
    }
}