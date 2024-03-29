import { inject } from "@angular/core";
import { ActionsService, PointsService } from "../../../services/api/admin/services";

export abstract class PointsBase {
    protected points = inject(PointsService);
    protected actions = inject(ActionsService);
}