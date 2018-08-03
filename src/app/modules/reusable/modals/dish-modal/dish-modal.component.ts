import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

import {User} from '../../../../classes/models/user';
import {Dish} from '../../../../classes/models/dish';
import {Category} from '../../../../classes/models/category';
import {Image} from '../../../../classes/models/image';

import {DishesService} from '../../../../services/api/dishes.service';

@Component({
  selector: 'lunch-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {

    @Output() error : EventEmitter<any> = new EventEmitter();
    @Output() updated : EventEmitter<any> = new EventEmitter();

    user: User;
    categories: Category[];
    dish: Dish;

    dishBackup: Dish;

    isUpdatingDish: boolean = false;
    isEditMode: boolean = false;

    isUploadingImages: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DishModalComponent>,
        private dishesApi: DishesService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {

        this.user = data.user;
        this.categories = data.categories;

        this.dishBackup = data.dish;
        this.dish = new Dish(this.dishBackup);
    }

    ngOnInit() {
    }

    close() {
        this.dish = new Dish(this.dishBackup);
        this.dialogRef.close();
    }

    saveUpdate() {
        this.isEditMode = !this.isEditMode;
        console.log("===SAVE DISH===");
        console.log(this.dish);

        this.isUpdatingDish = true;

        this.dishesApi.saveDish(this.user.id, this.dish).then((response) => {
            this.isUpdatingDish = false;

            this.snackBar.open('Dish was successfully saved', '', {
                duration: 2000,
            });

            this.updated.emit(true);

            console.log("===SAVE SUCCESS===",response);
        }).catch((error) => {
            console.log("===SAVE ERROR===",error);

            this.error.emit(error);
            this.isUpdatingDish = false;
        });
    }

    discardChanges() {
        this.isEditMode = !this.isEditMode;
        this.dish = new Dish(this.dishBackup);
    }

    imagesChanged(images: Image[]) {
        console.log("==IMAGES==", images);
        this.dish.images = images
    }

    imagesUploading(uploading: boolean) {
        console.log("==uploading==", uploading);
        this.isUploadingImages = uploading
    }
}
