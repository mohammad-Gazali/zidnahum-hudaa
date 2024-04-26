import { InjectionToken, signal } from "@angular/core";
import { StudentDetails } from "../../services/api/models";
import { StudentComponent } from "./student.component";

export const STUDENT = new InjectionToken('current student in details page', {
    providedIn: StudentComponent,
    factory: () => {
        return signal<StudentDetails | undefined>(undefined);
    },
})