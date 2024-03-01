import { inject } from "@angular/core";
import { StudentsService } from "../../../services/api/admin/services";

export abstract class StudentsBase {
    protected students = inject(StudentsService);
}