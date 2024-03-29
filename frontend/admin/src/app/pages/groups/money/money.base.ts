import { inject } from "@angular/core";
import { ActionsService, MoneyService } from "../../../services/api/admin/services";

export abstract class MoneyBase {
    protected money = inject(MoneyService);
    protected actions = inject(ActionsService);
}