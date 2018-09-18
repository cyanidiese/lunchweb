import {Pipe, PipeTransform} from '@angular/core';

import {Dish} from '../../../classes/models/dish';
import {Category} from '../../../classes/models/category';

@Pipe({
    name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

    transform(dish: Dish, categories: Category[]): any {
        let category = categories.filter(cat => cat.id == dish.categoryId).pop();
        return category ? category.title : undefined;
    }

}
