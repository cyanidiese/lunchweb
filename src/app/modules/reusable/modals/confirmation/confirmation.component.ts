import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'lunch-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    title: string;
    text: string;
    okButtonText: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.title = data.title;
        this.text = data.text;
        this.okButtonText = data.okButtonText;
    }

    ngOnInit() {
    }

    ok() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close();
    }

}
