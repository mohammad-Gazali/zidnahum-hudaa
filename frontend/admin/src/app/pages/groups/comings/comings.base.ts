import { inject } from "@angular/core";
import { ComingsService } from "../../../services/api/admin/services";

export abstract class ComingsBase {
    protected comings = inject(ComingsService);
}