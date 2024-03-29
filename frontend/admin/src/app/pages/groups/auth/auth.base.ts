import { inject } from "@angular/core";
import { ActionsService, AuthService } from "../../../services/api/admin/services";

export abstract class AuthBase {
    protected auth = inject(AuthService);
    protected actions = inject(ActionsService);
}