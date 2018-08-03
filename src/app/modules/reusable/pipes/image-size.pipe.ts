import {Pipe, PipeTransform} from '@angular/core';
import {Image} from '../../../classes/models/image';

@Pipe({
    name: 'imageSize'
})
export class ImageSizePipe implements PipeTransform {

    transform(image: Image, size?: string): any {

        let imageGuid = '8933ccf5-a825-4e53-a647-4625e187f010';
        size = size ? size : '100x100';

        imageGuid = (image && image.guid) ? image.guid : imageGuid;

        return 'https://ucarecdn.com/' + imageGuid + '/-/scale_crop/' + size + '/center/';
    }

}
