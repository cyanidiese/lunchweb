import {Injectable} from "@angular/core";

import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {ConfirmationComponent} from './confirmation/confirmation.component';
import {CopyMenuComponent} from './copy-menu/copy-menu.component';
import {User} from '../../../classes/models/user';
import {DishModalComponent} from './dish-modal/dish-modal.component';
import {Dish} from '../../../classes/models/dish';
import {Category} from '../../../classes/models/category';
import {UserModalComponent} from './user-modal/user-modal.component';
import {Office} from '../../../classes/models/office';
import {CategoryModalComponent} from './category-modal/category-modal.component';
import {Translation} from '../../../classes/models/translation';
import {CommentsModalComponent} from './comments-modal/comments-modal.component';

@Injectable()
export class ModalsService {

    constructor(private dialog: MatDialog) { }

    public confirmationDialog(title, text, okButtonText?) : MatDialogRef<ConfirmationComponent> {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            title: title,
            text: text,
            okButtonText: okButtonText,
        };

        return this.dialog.open(ConfirmationComponent, dialogConfig);

    }

    public cloneMenuDialog(user: User, toDate: string) : MatDialogRef<CopyMenuComponent> {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        dialogConfig.data = {
            user: user,
            toDate: toDate
        };

        return this.dialog.open(CopyMenuComponent, dialogConfig);
    }

    public dishDetailsDialog(user: User, categories: Category[], dish?: Dish) : MatDialogRef<DishModalComponent> {

        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        dialogConfig.data = {
            user: user,
            categories: categories,
            dish: dish ? dish : new Dish()
        };

        const dialogRef = this.dialog.open(DishModalComponent, dialogConfig);

        dialogRef.componentInstance.error.subscribe(error => {
            this.confirmationDialog(error["name"] ? error["name"] : "Error", error.message);
        });

        return dialogRef;
    }

    public userDetailsDialog(currentUser: User, offices: Office[], user?: User) : MatDialogRef<UserModalComponent> {

        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        dialogConfig.data = {
            currentUser: currentUser,
            offices: offices,
            user: user ? user : new User()
        };

        const dialogRef = this.dialog.open(UserModalComponent, dialogConfig);

        dialogRef.componentInstance.error.subscribe(error => {
            this.confirmationDialog(error["name"] ? error["name"] : "Error", error.message);
        });

        return dialogRef;
    }

    public categoryDialog(user: User, providerId: number, category: Category, categories: Category[], isRemoving: boolean) : MatDialogRef<CategoryModalComponent> {

        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        dialogConfig.data = {
            category: category ? category : new Category({ title : new Translation()}),
            user: user,
            categories: categories,
            providerId: providerId,
            isRemoving: isRemoving,
        };

        const dialogRef = this.dialog.open(CategoryModalComponent, dialogConfig);

        dialogRef.componentInstance.error.subscribe(error => {
            this.confirmationDialog(error["name"] ? error["name"] : "Error", error.message);
        });

        return dialogRef;
    }

    public commentsDialog(dishId: number, itemId: number, replyToCommentId: number) : MatDialogRef<CommentsModalComponent> {

        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        dialogConfig.data = {
            dishId: dishId,
            itemId: itemId,
            replyToCommentId: replyToCommentId
        };

        const dialogRef = this.dialog.open(CommentsModalComponent, dialogConfig);

        dialogRef.componentInstance.error.subscribe(error => {
            this.confirmationDialog(error["name"] ? error["name"] : "Error", error.message);
        });

        return dialogRef;
    }
}
