import {Component, EventEmitter, Input, OnInit, OnChanges, Output} from '@angular/core';

import {Image} from '../../../../classes/models/image';

@Component({
    selector: 'lunch-images-gallery',
    templateUrl: './images-gallery.component.html',
    styleUrls: ['./images-gallery.component.scss'],
})
export class ImagesGalleryComponent implements OnInit, OnChanges {

    @Input() editMode: boolean = false;
    @Input() images: Image[] = [];
    @Output() imagesChanged: EventEmitter<Image[]> = new EventEmitter();
    @Output() imagesUploading: EventEmitter<boolean> = new EventEmitter();

    currentImagePosition: number = 1;
    switchImageProgress: number = 0;

    uploadingProgress: number = 0;
    uploadingBuffer: number = 0;

    activeImage: Image = null;
    nextImage: Image = null;
    prevImage: Image = null;

    alreadyRotating: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.switchImageProgress = 0;

        if(this.images && this.images.length) {
            this.setActiveImage(this.images[0]);
            if (!this.alreadyRotating) {
                this.rotateImages();
            }
        }
    }

    removeImage(img : Image) {
        let images = this.images.filter(image => image.guid != img.guid);
        this.imagesChanged.emit(images);
    }

    completeUpload($event) {
        this.uploadingProgress = 0;
        this.uploadingBuffer = 0;

        let images = this.images.slice(0);
        images.push(new Image({
            guid : $event.uuid
        }));
        this.imagesChanged.emit(images);
        this.imagesUploading.emit(false);
    }

    progressUpload($event) {
        this.uploadingProgress = $event.progress * 100;
        this.uploadingBuffer = $event.uploadProgress * 100;
        this.imagesUploading.emit(true);
    }

    rotateImages(){
        if(this.images.length > 1) {
            this.alreadyRotating = true;
            this.switchImageProgress += 1;
            if (this.switchImageProgress == 100) {
                this.goToTheNextImage();
            }
            setTimeout(() => this.rotateImages(), 100);
        }
        else{
            this.alreadyRotating = false;
        }
    }

    setActiveImage(image: Image) {
        this.activeImage = image;
        this.switchImageProgress = 0;
        this.setPrevAndNextImage(image)
    }

    setPrevAndNextImage(image: Image) {

        let prevImage = null;
        let nextImage = null;
        let iterationImage = null;

        if (this.images.length) {

            for (let i = 0; i < this.images.length; i++) {

                iterationImage = this.images[i];

                if (iterationImage.guid == image.guid) {

                    switch(i){
                        case 0:
                            prevImage = this.images[this.images.length - 1];
                            nextImage = this.images[i + 1];
                            break;
                        case this.images.length - 1:
                            prevImage = this.images[i - 1];
                            nextImage = this.images[0];
                            break;
                        default:
                            prevImage = this.images[i - 1];
                            nextImage = this.images[i + 1];
                            break;
                    }

                }
            }
        }


        this.prevImage = prevImage;
        this.nextImage = nextImage;
    }

    goToThePrevImage() {
        this.setActiveImage(this.prevImage)
    }

    goToTheNextImage() {
        this.setActiveImage(this.nextImage)
    }

}
