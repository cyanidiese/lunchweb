import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Dish} from '../../classes/models/dish';

@Injectable()
export class DishesService {

    constructor(private api: ApiService) {
    }

    getDishes(providerId?: number, categoryId?: number) {

        let params = {provider_id: providerId, category_id: categoryId};

        return this.api.get('/dishes/index', params);
    }

    saveDish(providerId: number, data: Dish) {
        return this.api.post('/provider/' + providerId + '/dish/save', [], data);
    }

    deleteDish(providerId: number, id: number) {
        return this.api.delete('/provider/' + providerId + '/dish/' + providerId + '/delete');
    }
}
