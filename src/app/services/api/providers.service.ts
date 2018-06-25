import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {UpdateProfileRequest} from '../../classes/requests/update-profile-request';

@Injectable()
export class ProvidersService {

    constructor(private api: ApiService) {
    }

    getProviders() {
        return this.api.get('/providers/index');
    }

    getProfile(providerId: number) {
        return this.api.get('/provider/' + providerId);
    }

    getHistory(providerId: number, fromDate: string, toDate: string) {
        return this.api.get('/provider/' + providerId + '/history/' + fromDate + '/to/' + toDate);
    }

    saveProvider(data: UpdateProfileRequest) {
        return this.api.post('/providers/save', [], data);
    }
}
