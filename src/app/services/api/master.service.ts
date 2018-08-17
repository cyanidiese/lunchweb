import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {UpdateProfileRequest} from '../../classes/requests/update-profile-request';

@Injectable()
export class MasterService {

    constructor(private api: ApiService) {
    }

    getProfile() {
        return this.api.get('/master/index');
    }

    getHistory(fromDate: string, toDate: string) {
        return this.api.get('/master/history/' + fromDate + '/to/' + toDate);
    }

    getStats(fromDate: string, toDate: string) {
        return this.api.get('/master/stats/' + fromDate + '/to/' + toDate);
    }

    updateProfile(data: UpdateProfileRequest) {
        return this.api.post('/master/update', [], data);
    }
}
