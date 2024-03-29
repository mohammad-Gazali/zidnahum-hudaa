import { inject } from "@angular/core";
import { ActionsService, GlobalsService } from "../../../services/api/admin/services";

export abstract class GlobalsBase {
    protected globals = inject(GlobalsService);
    protected actions = inject(ActionsService);
}