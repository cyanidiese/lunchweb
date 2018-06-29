import {Pipe, PipeTransform} from '@angular/core';

import {Image} from '../../../classes/models/image';

@Pipe({
    name: 'firstDishImage'
})
export class FirstDishImagePipe implements PipeTransform {

    transform(images: Image[], size?: string): any {

        let imageGuid = "8933ccf5-a825-4e53-a647-4625e187f010";
        size = size ? size : "100x100";

        if(images.length){
            imageGuid = images[0].guid;
        }

        return "https://ucarecdn.com/"+imageGuid+"/-/scale_crop/"+size+"/center/";
    }

}
