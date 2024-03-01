import { inject } from "@angular/core";
import { AuthService } from "../../../services/api/admin/services";

export abstract class AuthBase {
    protected auth = inject(AuthService);
}