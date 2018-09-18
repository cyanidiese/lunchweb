import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
    name: 'formatDateString'
})
export class FormatDateStringPipe implements PipeTransform {

    transform(date: string, format?: string): string {

        date = date.replace("T00:00:00Z ", " ");
        date = date.replace("T", " ").replace("Z", "");

        format = format ? format : "YYYY-MM-DD HH:mm:ss";

        if(format == 'relative'){
            return moment(date).fromNow();
        }

        return moment(date).format(format);
    }

}
