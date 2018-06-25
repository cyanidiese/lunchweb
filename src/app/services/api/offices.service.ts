import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Office} from '../../classes/models/office';

@Injectable()
export class OfficesService {

    constructor(private api: ApiService) {
    }

    getOffices() {
        return this.api.get('/offices/index');
    }

    saveOffice(data: Office) {
        return this.api.post('/offices/save', [], data);
    }

    deleteOffice(officeId: number) {
        return this.api.delete('/offices/' + officeId + '/delete');
    }
}
