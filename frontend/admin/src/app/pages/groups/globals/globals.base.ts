import { inject } from "@angular/core";
import { GlobalsService } from "../../../services/api/admin/services";

export abstract class GlobalsBase {
    protected globals = inject(GlobalsService);
}