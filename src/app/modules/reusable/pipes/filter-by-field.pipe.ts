import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByField'
})
export class FilterByFieldPipe implements PipeTransform {

    transform(value: any[], fieldName: string, fieldvalue: any): any {

        if (value && value.length) {
            value = value.filter(val => val[fieldName] == fieldvalue);
        }
        return value;
    }

}
