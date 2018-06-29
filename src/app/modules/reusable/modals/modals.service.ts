import {Injectable} from "@angular/core";

import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {ConfirmationComponent} from './confirmation/confirmation.component';

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
            okButtonText: okButtonText ? okButtonText : "Ok",
        };

        return this.dialog.open(ConfirmationComponent, dialogConfig);

    }
}
