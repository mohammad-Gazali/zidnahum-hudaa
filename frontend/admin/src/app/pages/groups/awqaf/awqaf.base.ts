import { inject } from "@angular/core";
import { AwqafService } from "../../../services/api/admin/services";

export abstract class AwqafBase {
    protected awqaf = inject(AwqafService);
}