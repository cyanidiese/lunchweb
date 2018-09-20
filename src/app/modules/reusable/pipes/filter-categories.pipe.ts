import {Pipe, PipeTransform} from '@angular/core';

import {Category} from '../../../classes/models/category';

@Pipe({
    name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

    transform(categories: Category[], providerId?: number, byProviderOnly?: boolean, excludeId?: number): any {

        let result = categories;

        if(providerId != undefined){
            result = result.filter(cat => ((cat.providerId == providerId) || (!byProviderOnly && !cat.providerId) ));
        }
        if(excludeId){
            result = result.filter(cat => (cat.id != excludeId));
        }

        return result;
    }

}
