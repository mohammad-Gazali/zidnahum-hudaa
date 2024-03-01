import { inject } from "@angular/core";
import { PointsService } from "../../../services/api/admin/services";

export abstract class PointsBase {
    protected points = inject(PointsService);
}