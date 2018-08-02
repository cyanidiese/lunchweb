import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortByField'
})
export class SortByFieldPipe implements PipeTransform {

    transform(array: Array<any>, byField, asc?, numeric?) {

        if (array && array.length) {
            if(numeric && Intl) {
                array = this.transformNumeric(array, byField, asc);
            }
            else {
                array.sort((a: any, b: any) => {
                    if (a[byField] < b[byField]) {
                        return (asc) ? -1 : 1;
                    } else if (a[byField] > b[byField]) {
                        return (asc) ? 1 : -1;
                    } else {
                        return 0;
                    }
                });
            }
        }

        return array;
    }

    private transformNumeric(array: Array<any>, byField, asc?){

        let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

        let numberSorts = [];
        for (let i = 0; i < array.length; i++) {
            let numberSort = array[i][byField] + '';
            numberSorts.push(numberSort);
        }
        numberSorts = numberSorts.sort(collator.compare);
        for (let i = 0; i < array.length; i++) {
            let numberSort = array[i][byField] + '';
            array[i]['numberSortOrder'] = numberSorts.indexOf(numberSort);
        }
        array.sort((a: any, b: any) => {
            if (a['numberSortOrder'] < b['numberSortOrder']) {
                return (asc) ? -1 : 1;
            } else if (a['numberSortOrder'] > b['numberSortOrder']) {
                return (asc) ? 1 : -1;
            } else {
                return 0;
            }
        });

        return array;
    }

}
