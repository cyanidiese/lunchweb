import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import * as moment from 'moment-timezone';

import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {Office} from '../../../classes/models/office';
import {Menu} from '../../../classes/models/menu';
import {Dish} from '../../../classes/models/dish';

import {ObjectCounter} from '../../../classes/requests/object-counter';
import {MenuUpdateRequest} from '../../../classes/requests/menu-update-request';

import {RequestError} from '../../../classes/errors/request-error';

import {StateService} from '../../../services/state.service';
import {MenusService} from '../../../services/api/menus.service';
import {ModalsService} from '../../reusable/modals/modals.service';

@Component({
  selector: 'lunch-provider-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    user: User = null;
    menu: Menu = null;

    offices: Office[] = [];
    categories: Category[] = [];
    dishes: Dish[] = [];

    currentDate: string;
    deliveryDate: Date;
    deadlineDate: Date;
    nowDate: Date;

    isCurrentlySavingMenu: boolean = false;
    isCurrentlyRemovingMenu: boolean = false;

    sidenavOpened: boolean = false;

    isAfterDeadline: boolean = false;
    dishesInMenu: any = {};
    dishPrices: any = {};
    dishSold: any = {};
    dishesMenuStruct: ObjectCounter[] = [];

    constructor(private state: StateService,
                private modalsService: ModalsService,
                private menusApi: MenusService,
                public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.state.updatePageRoleType("provider");
        this.state.updatePageType("menu");

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));
        this.state.dishesUpdated$.subscribe(dishes => this.updateDishes(dishes));

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());
        this.updateDishes(this.state.getCurrentDishes());

        this.initDate();
        this.getMenuForCurrentDate();
    }

    logOut(){
        this.state.logOut();
    }

    isDoingAnyAction(){
        return this.isCurrentlySavingMenu || this.isCurrentlyRemovingMenu;
    }

    updateUser(user: User){

        if(!this.user && user){
            this.state.getDishesByProvider(user.id);
        }

        this.user = user;
    }

    updateOffices(offices: Office[]){
        this.offices = offices;
    }

    updateCategories(categories: Category[]){
        this.categories = categories;
    }

    updateDishes(dishes: Dish[]){
        this.dishes = dishes;
    }

    updateMenu(menu: Menu){
        this.menu = menu;

        if(this.menu){
            let dishesMenuStruct = [];
            let dishesInMenu = {};
            let dishPrices = {};
            let dishSold = {};

            for(let i = 0; i < this.menu.items.length; i++){
                let item = this.menu.items[i];
                dishesInMenu[item.dishId] = true;
                dishPrices[item.dishId] = item.price;
                dishSold[item.dishId] = item.initialCount - item.availableCount;
                dishesMenuStruct.push(new ObjectCounter({
                    id : item.dishId,
                    count : item.initialCount
                }));
            }

            this.dishesMenuStruct = dishesMenuStruct;
            this.dishesInMenu = dishesInMenu;
            this.dishPrices = dishPrices;
            this.dishSold = dishSold;

            console.log("deadline");

            let menuDate = (this.menu.date.split("T"))[0];
            let menuDeadline = (this.menu.deadline.replace("T", " ").replace("Z", ""));


            this.deliveryDate = new Date(menuDate + " " + this.menu.time);
            this.deadlineDate = new Date(menuDeadline);

            this.isAfterDeadline = moment(this.deadlineDate).isBefore(moment());
            this.nowDate = new Date();

            // this.deadlineChange();
        }
        else{
            this.dishesMenuStruct = [];
            this.dishesInMenu = {};
            this.dishPrices = {};
            this.dishPrices = {};
            this.dishSold = {};

            this.isAfterDeadline = moment(this.currentDate).endOf('day').isBefore(moment());
            this.nowDate = new Date();
            console.log("===========");
            console.log(this.isAfterDeadline);
            console.log(moment().endOf('day').subtract(1, "day"));
            // this.initDate();
        }
    }

    formatDate(date: Date, format: string): string{
        return moment(date).format(format);
    }

    initDate(){
        let defaultFormat = "YYYY-MM-DD HH:mm:ss";
        this.nowDate = new Date();
        this.deadlineDate = new Date(moment().format(defaultFormat));
        this.deliveryDate = new Date(moment().add(3, 'hours').format(defaultFormat));
        this.updateMenuDate();
    }

    updateMenuDate(){
        let currentDate = this.formatDate(this.deliveryDate, "YYYY-MM-DD");
        if(currentDate != this.currentDate){
            this.currentDate = currentDate;
            this.getMenuForCurrentDate();
        }
    }

    getMenuForCurrentDate() {

        this.menusApi.getMenuByDate(this.user.id, this.currentDate).then((response: Menu) => {

            this.updateMenu(response);

        }).catch((error : RequestError) => {

            console.log(error);
            this.updateMenu(null);

            this.state.checkErrorType(error);
        });
    }

    toggleDishInMenu(dishId){

        if(this.dishesInMenu[dishId]){
            delete this.dishesInMenu[dishId];
            this.dishesMenuStruct = this.dishesMenuStruct.filter(val => val.id != dishId);
        }
        else{
            this.dishesInMenu[dishId] = true;
            let newItemCount = 10;

            if(this.menu && this.menu.items && this.menu.items.length){
                let menuItemByDish = this.menu.items.filter(val => val.dishId == dishId).pop();
                if(menuItemByDish){
                    newItemCount = menuItemByDish.initialCount;
                }
            }

            this.dishesMenuStruct.push(new ObjectCounter({
                id : dishId,
                count : newItemCount
            }));

        }
    }

    onSaveMenu(){

        if(!this.dishesMenuStruct.length){
            const confirmation = this.modalsService.confirmationDialog('Add Dishes', 'You need to add dises to menu first.', 'Add');

            confirmation.afterClosed().subscribe(
                confirmed => {
                    if (confirmed) {
                        this.sidenavOpened = true;
                    }
                }
            );
        }
        else {

            let request = new MenuUpdateRequest({
                deliveryTime: this.formatDate(this.deliveryDate, "HH:mm:ss"),
                deadline: this.formatDate(this.deadlineDate, "YYYY-MM-DD HH:mm:ss"),
                dishes: this.dishesMenuStruct,
            });
            console.log("request!!");
            console.log(this.user.id);
            console.log(this.currentDate);
            console.log(request);
            this.menusApi.saveMenu(this.user.id, this.currentDate, request).then((response: Menu) => {

                this.snackBar.open('Menu was successfully saved', '', {
                    duration: 2000,
                });

                console.log("Saved!!");
                console.log(response);
                this.updateMenu(response);
                // this.getMenuForCurrentDate();

            }).catch((error: RequestError) => {

                console.log("ERROR!!");
                console.log(error);

                this.state.checkErrorType(error, true);
            });
        }

    }

    onRemoveMenu(){

        const confirmation = this.modalsService.confirmationDialog('Remove menu', 'Are you sure to remove this menu?', 'Remove it');

        confirmation.afterClosed().subscribe(
            confirmed => {
                if (confirmed) {
                    this.menusApi.deleteMenu(this.user.id, this.currentDate).then((response: Menu) => {

                        this.snackBar.open('Menu was successfully removed', '', {
                            duration: 2000,
                        });
                        this.updateMenu(null);
                        // this.getMenuForCurrentDate();

                    }).catch((error : RequestError) => {

                        console.log("ERROR!!");
                        console.log(error);

                        this.state.checkErrorType(error, true);
                    });
                }
            }
        );

    }

    onCopyMenu(){
        const confirmation = this.modalsService.cloneMenuDialog(this.user, this.currentDate);

        confirmation.afterClosed().subscribe(
            result => {
                if(result) {
                    if (result.message) {
                        this.state.checkErrorType(result, true);
                    }
                    else {
                        this.snackBar.open('Menu was successfully cloned', '', {
                            duration: 2000,
                        });
                        this.getMenuForCurrentDate();
                    }
                }
            }
        );
    }

    dishDetailsDialog(dish: Dish){
        const dishDialog = this.modalsService.dishDetailsDialog(this.user, this.categories, dish);
        dishDialog.componentInstance.updated.subscribe(() => {
            this.state.getDishesByProvider(this.user.id);
        });
    }

}
