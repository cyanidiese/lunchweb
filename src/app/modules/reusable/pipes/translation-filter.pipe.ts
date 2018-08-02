import {Pipe, PipeTransform} from '@angular/core';
import {Translation} from '../../../classes/models/translation';

@Pipe({
    name: 'translationFilter'
})
export class TranslationFilterPipe implements PipeTransform {

    transform(value: Translation, lang?: string): string {

        if(typeof value === "string"){
            return value;
        }

        lang = lang ? lang : "en";

        let translatedStr = "";

        if(value[lang]){
            translatedStr = value[lang]
        }
        else{
            if(value["en"]){
                translatedStr = value["en"]
            }
            else{
                let translations = Object.values(value);
                for(let i = 0; i < translations.length; i++){
                    if(translations[i]){
                        return translations[i];
                    }
                }
            }
        }

        return translatedStr;
    }

}
