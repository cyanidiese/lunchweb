import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as uploadcare from 'uploadcare-widget'

@Component({
    selector: 'lunch-uploadcare-uploader',
    templateUrl: './uploadcare-uploader.component.html',
    styleUrls: ['./uploadcare-uploader.component.scss']
})
export class UploadcareUploaderComponent implements OnInit {

    @Input() disabled: boolean = false;
    @Output() onComplete: EventEmitter<any> = new EventEmitter();
    @Output() onProgress: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    openDialog(){

        uploadcare.openDialog(null, {
            publicKey: '7b216cf420f42da89ef0',
            imagesOnly: true
        }).done( (file) => {
            file.done( (fileInfo) => {
                this.onComplete.emit(fileInfo);
            }).progress( (fileInfo) => {
                this.onProgress.emit(fileInfo);
            });
        });
    }

}
