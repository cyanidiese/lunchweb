import {Injectable} from "@angular/core";

import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {ConfirmationComponent} from './confirmation/confirmation.component';
import {CopyMenuComponent} from './copy-menu/copy-menu.component';
import {User} from '../../../classes/models/user';
import {DishModalComponent} from './dish-modal/dish-modal.component';
import {Dish} from '../../../classes/models/dish';
import {Category} from '../../../classes/models/category';

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

        return this.dialog.open(DishModalComponent, dialogConfig);
    }
}
