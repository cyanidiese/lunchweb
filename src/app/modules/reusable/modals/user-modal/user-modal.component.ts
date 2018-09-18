import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

import {User} from '../../../../classes/models/user';
import {Image} from '../../../../classes/models/image';

import {DishesService} from '../../../../services/api/dishes.service';
import {Office} from '../../../../classes/models/office';
import {UserService} from '../../../../services/api/user.service';

@Component({
  selector: 'lunch-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

    @Output() error : EventEmitter<any> = new EventEmitter();
    @Output() updated : EventEmitter<any> = new EventEmitter();

    currentUser: User;
    offices: Office[];
    user: User;

    userBackup: User;

    isUpdatingUser: boolean = false;
    isEditMode: boolean = false;

    isUploadingImages: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserModalComponent>,
        private userApi: UserService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {

        this.currentUser = data.currentUser;
        this.offices = data.offices;

        this.userBackup = data.user;
        this.user = new User(this.userBackup);
    }

    ngOnInit() {
    }

    close() {
        this.user = new User(this.userBackup);
        this.dialogRef.close();
    }

    saveUpdate() {
        this.isEditMode = !this.isEditMode;
        console.log("===SAVE USER===");
        console.log(this.user);

        // this.isUpdatingUser = true;
        //
        // this.userApi.saveUser(this.currentUser.id, this.user).then((response) => {
        //     this.isUpdatingUser = false;
        //
        //     this.snackBar.open('User was successfully saved', '', {
        //         duration: 2000,
        //     });
        //
        //     this.updated.emit(true);
        //
        //     console.log("===SAVE SUCCESS===",response);
        // }).catch((error) => {
        //     console.log("===SAVE ERROR===",error);
        //
        //     this.error.emit(error);
        //     this.isUpdatingUser = false;
        // });
    }

    discardChanges() {
        this.isEditMode = !this.isEditMode;
        this.user = new User(this.userBackup);
    }

    imageChanged(images: Image[]) {
        console.log("==IMAGES==", images);
        this.user.image = images.length ? images[0]: null;
    }

    imagesUploading(uploading: boolean) {
        console.log("==uploading==", uploading);
        this.isUploadingImages = uploading
    }

}
