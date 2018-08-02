import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import * as moment from 'moment-timezone';
import {RequestError} from '../../../../classes/errors/request-error';
import {Menu} from '../../../../classes/models/menu';
import {MenusService} from '../../../../services/api/menus.service';
import {User} from '../../../../classes/models/user';

@Component({
    selector: 'lunch-copy-menu',
    templateUrl: './copy-menu.component.html',
    styleUrls: ['./copy-menu.component.scss']
})
export class CopyMenuComponent implements OnInit {

    user: User;
    toDate: string;
    cloneDateStr: string;

    menu: Menu = null;
    menus: Menu[] = [];

    isCloningMenu: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CopyMenuComponent>,
        private menusApi: MenusService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.user = data.user;
        this.toDate = data.toDate;
    }

    ngOnInit() {
        this.loadMenuList();
    }

    ok() {
        this.cloneMenu();
    }

    cancel() {
        this.dialogRef.close();
    }

    error(error: RequestError) {
        this.dialogRef.close(error);
    }

    private formatDate(date: string, format: string): string{
        return moment(date).format(format);
    }

    loadMenuList() {

        this.menusApi.getMenuList(this.user.id).then((response: Menu[]) => {

            this.updateMenuList(response.slice(0,20));

        }).catch((error : RequestError) => {

            this.updateMenuList([]);
        });
    }

    private updateMenuList(menus: Menu[]){
        this.menus = menus;
    }

    public changedMenuDate(){
        this.menu = this.menus.filter(menuSingle => menuSingle.date == this.cloneDateStr).pop();
    }

    private cloneMenu(){

        this.isCloningMenu = true;

        let cloneDate = this.formatDate(this.cloneDateStr, "YYYY-MM-DD");

        this.menusApi.cloneMenu(this.user.id, cloneDate, this.toDate).then((response: Menu) => {

            this.isCloningMenu = false;
            this.dialogRef.close(response);

        }).catch((error : RequestError) => {

            this.isCloningMenu = false;
            console.log("ERROR!!");
            console.log(error);
            this.dialogRef.close(error);
        });
    }

}
