import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

@Injectable()
export class AdminService {

    constructor(private api: ApiService) {
    }

    getHistory(fromDate: string, toDate: string) {
        return this.api.get('/admin/history/' + fromDate + '/to/' + toDate);
    }

    disableUser(userId: number) {
        return this.api.put('/admin/users/' + userId + '/disable');
    }

}
