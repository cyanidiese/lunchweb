import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByField'
})
export class FilterByFieldPipe implements PipeTransform {

    transform(value: any[], fieldName: string, fieldvalue: any, onlyFirst?:boolean): any {

        if(fieldvalue == 'all'){
            return value;
        }

        if (value && value.length) {
            value = value.filter(val => val[fieldName] == fieldvalue);
        }
        if(value && value.length && onlyFirst){
            return value.pop();
        }
        return value;
    }

}
