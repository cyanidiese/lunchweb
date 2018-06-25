import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {Category} from '../../classes/models/category';

@Injectable()
export class CategoriesService {

    constructor(private api: ApiService) {
    }

    getCategories() {
        return this.api.get('/categories/index');
    }

    saveCategory(data: Category) {
        return this.api.post('/categories/save', [], data);
    }

    deleteCategory(categoryId: number) {
        return this.api.delete('/categories/' + categoryId + '/delete');
    }

}
