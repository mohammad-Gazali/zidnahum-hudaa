import { inject } from "@angular/core";
import { ActionsService, AwqafService } from "../../../services/api/admin/services";

export abstract class AwqafBase {
    protected awqaf = inject(AwqafService);
    protected actions = inject(ActionsService);
}