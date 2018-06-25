import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {AuthLoginRequest} from '../../classes/requests/auth-login-request';

@Injectable()
export class AuthService {

    constructor(private api: ApiService) {
    }

    logInRequest(params: AuthLoginRequest) {
        return this.api.post('/auth/login', [], params);
    }

}
