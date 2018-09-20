import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder} from '@angular/forms';

import {Category} from '../../../../classes/models/category';
import {User} from '../../../../classes/models/user';

import {FilterCategoriesPipe} from '../../pipes/filter-categories.pipe';

import {CategoriesService} from '../../../../services/api/categories.service';

@Component({
    selector: 'lunch-category-modal',
    templateUrl: './category-modal.component.html',
    styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

    @Output() error : EventEmitter<any> = new EventEmitter();
    @Output() updated : EventEmitter<any> = new EventEmitter();

    categories: Category[];
    category: Category;
    user: User;
    isRemoving: boolean = false;

    isProcessingCategory: boolean = false;

    categoryBackup: Category;

    providerId: number = 0;

    assignTo: number = 0;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CategoryModalComponent>,
        private categoryApi: CategoriesService,
        private snackBar: MatSnackBar,
        private filterCategories: FilterCategoriesPipe,
        @Inject(MAT_DIALOG_DATA) data) {

        this.categoryBackup = data.category;
        this.categories = data.categories;
        this.providerId = data.providerId;
        this.isRemoving = data.isRemoving;
        this.user = data.user;
        this.category = new Category(this.categoryBackup);

        let otherCategories = this.filterCategories.transform(this.categories, this.providerId, false, this.category.id);
        if(otherCategories){
            this.assignTo = otherCategories[0].id;
        }

    }

    ngOnInit() {
    }


    close() {
        this.category = new Category(this.category);
        this.dialogRef.close();
    }

    saveUpdate() {
        console.log("===SAVE Category===");
        console.log(this.category);

        this.isProcessingCategory = true;

        this.categoryApi.saveCategory(this.category).then((response) => {
            this.isProcessingCategory = false;

            this.snackBar.open('Category was successfully saved', '', {
                duration: 2000,
            });

            this.updated.emit(true);
            this.dialogRef.close();

            console.log("===SAVE SUCCESS===",response);
        }).catch((error) => {
            console.log("===SAVE ERROR===",error);

            this.error.emit(error);
            this.isProcessingCategory = false;
        });
    }

    removeCategory() {
        console.log("===REMOVE Category===");
        console.log(this.category);

        this.isProcessingCategory = true;

        this.categoryApi.deleteCategory(this.category.id, this.assignTo).then((response) => {
            this.isProcessingCategory = false;

            this.snackBar.open('Category was successfully removed', '', {
                duration: 2000,
            });

            this.updated.emit(true);
            this.dialogRef.close();

            console.log("===REMOVE SUCCESS===",response);
        }).catch((error) => {
            console.log("===REMOVE ERROR===",error);

            this.error.emit(error);
            this.isProcessingCategory = false;
        });
    }

}
