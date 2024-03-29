import { inject } from "@angular/core";
import { ActionsService, StudentsService } from "../../../services/api/admin/services";

export abstract class StudentsBase {
    protected students = inject(StudentsService);
    protected actions = inject(ActionsService);
}