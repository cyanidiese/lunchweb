import {Component, Inject, OnInit} from '@angular/core';
import {CopyMenuComponent} from '../copy-menu/copy-menu.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Menu} from '../../../../classes/models/menu';
import {User} from '../../../../classes/models/user';
import {MenusService} from '../../../../services/api/menus.service';
import {FormBuilder} from '@angular/forms';
import {RequestError} from '../../../../classes/errors/request-error';
import {Dish} from '../../../../classes/models/dish';
import {Category} from '../../../../classes/models/category';

@Component({
  selector: 'lunch-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {

    user: User;
    categories: Category[];
    dish: Dish;

    isUpdatingDish: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DishModalComponent>,
        private menusApi: MenusService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.user = data.user;
        this.categories = data.categories;
        this.dish = data.dish;
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    saveUpdate() {
    }

    ucareOnUploadHandler($event) {
        console.log("==ON UPLOAD==", $event);
    }

    ucareOnChangeHandler($event) {
        console.log("==ON CHANGE==", $event);
    }

    ucareOnProgressHandler($event) {
        console.log("==ON PROGRESS==", $event);
    }
}
// (on-upload-complete)="ucareOnUploadHandler($event)"
// (on-change)="ucareOnChangeHandler($event)"
// (on-progress)="ucareOnProgressHandler($event)">
