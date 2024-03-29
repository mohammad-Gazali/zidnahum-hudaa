import { inject } from "@angular/core";
import { ActionsService, ComingsService } from "../../../services/api/admin/services";

export abstract class ComingsBase {
    protected comings = inject(ComingsService);
    protected actions = inject(ActionsService);
}