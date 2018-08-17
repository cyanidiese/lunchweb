import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

@Injectable()
export class UserService {

    constructor(private api: ApiService) {
    }

    getProfile() {
        return this.api.get('/user/index');
    }

    updateLanguage(lang: string) {
        return this.api.post('/user/language/'+lang);
    }

    updateProvider(providerId: number) {
        return this.api.post('/user/provider/'+providerId);
    }
}
