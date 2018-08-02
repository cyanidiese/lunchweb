import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
    name: 'formatDateString'
})
export class FormatDateStringPipe implements PipeTransform {

    transform(date: string, format?: string): string {

        format = format ? format : "YYYY-MM-DD HH:mm:ss";

        return moment(date).format(format);
    }

}
