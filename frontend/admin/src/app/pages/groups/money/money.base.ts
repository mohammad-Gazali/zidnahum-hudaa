import { inject } from "@angular/core";
import { MoneyService } from "../../../services/api/admin/services";

export abstract class MoneyBase {
    protected money = inject(MoneyService);
}