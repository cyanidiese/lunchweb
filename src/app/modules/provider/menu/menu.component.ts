import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {StateService} from '../../../services/state.service';
import {Office} from '../../../classes/models/office';
import {Menu} from '../../../classes/models/menu';
import {Dish} from '../../../classes/models/dish';

import {MenusService} from '../../../services/api/menus.service';

import * as moment from 'moment-timezone';
import {ObjectCounter} from '../../../classes/requests/object-counter';

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

    isAfterDeadline: boolean = false; //TODO: detect deadline
    dishesInMenu: any = {}; //TODO: detect deadline
    dishesMenuStruct: ObjectCounter[] = []; //TODO: detect deadline

    menuDateControl: FormControl = new FormControl();

    constructor(private state: StateService,
                private menusApi: MenusService) {
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
    }

    logOut(){
        this.state.logOut();
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

            for(let i = 0; i < this.menu.items.length; i++){
                let item = this.menu.items[i];
                dishesInMenu[item.dishId] = true;
                dishesMenuStruct.push(new ObjectCounter({
                    id : item.dishId,
                    count : item.initialCount
                }));
            }

            this.dishesMenuStruct = dishesMenuStruct;
            this.dishesInMenu = dishesInMenu;
        }
        else{
            this.dishesMenuStruct = [];
            this.dishesInMenu = {};
        }
    }

    initDate(){

        this.currentDate = moment().format("YYYY-MM-DD");

        this.getMenuForCurrentDate();

        this.menuDateControl = new FormControl(this.currentDate);
    }

    dateChange(dateValue) {

        let dateParts = dateValue.value.toISOString().split("T");
        this.currentDate = dateParts[0];
        this.getMenuForCurrentDate();
    }

    getMenuForCurrentDate() {

        this.menusApi.getMenuByDate(this.user.id, this.currentDate).then((response: Menu) => {

            this.updateMenu(response);

        }).catch(error => {

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


}
