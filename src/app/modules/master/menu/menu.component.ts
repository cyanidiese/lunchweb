import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import * as moment from 'moment-timezone';

import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {Office} from '../../../classes/models/office';
import {Menu} from '../../../classes/models/menu';
import {Dish} from '../../../classes/models/dish';
import {MenuItem} from '../../../classes/models/menu-item';
import {Order} from '../../../classes/models/order';

import {SimpleId} from '../../../classes/structs/simple-id';
import {IdsArray} from '../../../classes/structs/ids-array';
import {ObjectCounter} from '../../../classes/requests/object-counter';
import {OrderingRequest} from '../../../classes/requests/ordering-request';
import {RequestError} from '../../../classes/errors/request-error';

import {StateService} from '../../../services/state.service';
import {ProvidersService} from '../../../services/api/providers.service';
import {MenusService} from '../../../services/api/menus.service';
import {DishesService} from '../../../services/api/dishes.service';
import {FavoritesService} from '../../../services/api/favorites.service';
import {OrdersService} from '../../../services/api/orders.service';
import {CommentsService} from '../../../services/api/comments.service';

import {ModalsService} from '../../reusable/modals/modals.service';

@Component({
  selector: 'lunch-master-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    user: User = null;

    offices: Office[] = [];
    categories: Category[] = [];
    orders: Order[] = [];

    provider: User = null;
    menu: Menu = null;

    currentDate: string;
    menuDate: Date = new Date();

    nowDate: Date = new Date();

    currentMenuDate: string = "2018-08-15";

    dishesCounts: any = {};

    selectedCat: any = "all";

    isCardView : boolean = false;
    onlyFavorites : boolean = false;

    isAfterDeadline: boolean = false;
    dishesInMenu: any = {};
    dishesMenuStruct: ObjectCounter[] = [];

    favorites: number[] = [];
    favoriteDishes: any = {};
    favoriteProcess: any = {};
    favoriteCount: number = 0;

    orderingItemOpened: any = {};
    orderingItemProcess: any = {};
    orderingItemCount: any = {};

    constructor(private snackBar: MatSnackBar,
                private state: StateService,
                private modalsService: ModalsService,
                private dishesApi: DishesService,
                private providersApi: ProvidersService,
                private favoritesApi: FavoritesService,
                private ordersApi: OrdersService,
                private commentsApi: CommentsService,
                private menusApi: MenusService) {
    }

    ngOnInit() {
        this.state.updatePageRoleType("master");
        this.state.updatePageType("menu");

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));

        this.initDate();

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());

        this.loadFavorites();

        this.reloadProviderMenu();
    }

    reloadProviderMenu() {
        this.loadCurrentProviderMenu();
        setTimeout(() => {
            this.reloadProviderMenu();
        }, 30000);
    }


    logOut(){
        this.state.logOut();
    }

    updateUser(user: User){
        this.user = user;
        this.detectProvider();
    }

    updateOffices(offices: Office[]){
        this.offices = offices;
    }

    updateCategories(categories: Category[]){
        this.categories = categories;
        this.updateDishesCounts();
    }

    formatDate(date: Date, format: string): string{
        return moment(date).format(format);
    }

    initDate(){
        this.nowDate = new Date();
        this.menuDate = new Date();
        this.updateMenuDate();
    }

    updateMenuDate(){
        let currentDate = this.formatDate(this.menuDate, "YYYY-MM-DD");
        if(currentDate != this.currentMenuDate){
            this.currentMenuDate = currentDate;
            this.loadCurrentProviderMenu();
            this.loadOrders();
        }
    }

    detectProvider(){
        if(this.user) {
            let providers = this.state.getCurrentProviders();
            let provider = providers.filter(prov => prov.id == this.user.providerId).pop();

            let needToReloadMenu = (provider && (!this.provider || (this.provider.id != provider.id)));

            this.provider = provider;

            if(needToReloadMenu) {

                this.loadCurrentProviderMenu();
                this.loadOrders();

            }
        }
    }

    loadCurrentProviderMenu(){

        if(this.provider) {

            this.menusApi.getMenuByDate(this.provider.id, this.currentMenuDate).then((result : Menu) => {
                console.log("RESULT", result);

                this.updateMenu(result);

            }).catch((error: RequestError) => {

                console.log("ERROR", error);

                this.updateMenu(null);

                this.snackBar.open(error.message, '', {
                    duration: 4000,
                });
            });
        }
    }

    loadFavorites(){

        this.favoritesApi.getFavorites().then((result : IdsArray) => {

            this.favorites = result.ids;

            this.detectFavoriteDishes();

        }).catch((error: RequestError) => {

            this.favorites = [];

            this.detectFavoriteDishes();
        });
    }

    loadOrders(){

        if(this.provider) {

            this.ordersApi.getOrdersByDate(this.provider.id, this.currentMenuDate).then((result: Order[]) => {

                console.log("ORDERS", result);

                this.orders = result;
                //
                // this.detectFavoriteDishes();

            }).catch((error: RequestError) => {

                console.log("ORDERS error", error);

                this.orders = [];
                //
                // this.detectFavoriteDishes();
            });
        }
    }

    detectFavoriteDishes(){
        let favoriteDishes = {};
        let favoriteCount = 0;

        if(this.favorites && this.favorites.length && this.menu && this.menu.items && this.menu.items.length){

            for(let i = 0; i < this.menu.items.length; i++){
                let dishId = this.menu.items[i].dish.id;
                favoriteDishes[dishId] = this.favorites.filter(favoriteId => (favoriteId == dishId)).length;
                favoriteCount += favoriteDishes[dishId] ? 1 : 0;
            }
        }

        this.favoriteDishes = favoriteDishes;
        this.favoriteCount = favoriteCount;
    }

    updateDishesCounts(){
        if(this.menu && this.menu.items && this.menu.items.length && this.categories.length) {

            let dishesCounts = {};

            for(let i = 0; i < this.categories.length; i++){
                let catId = this.categories[i].id;
                dishesCounts[catId] = this.menu.items.filter(item => ((item.dish.categoryId == catId) && this.matchesFavoritesFilter(item.dish))).length;
            }
            dishesCounts["all"] = this.menu.items.filter(item => this.matchesFavoritesFilter(item.dish)).length;

            this.dishesCounts = dishesCounts;
        }
        else{
            this.dishesCounts = {};
        }
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

            console.log("deadline");

            let menuDate = (this.menu.date.split("T"))[0];
            let menuDeadline = (this.menu.deadline.replace("T", " ").replace("Z", ""));

            this.isAfterDeadline = moment(new Date(menuDeadline)).isBefore(moment());
            this.nowDate = new Date();

            // this.deadlineChange();
        }
        else{
            this.dishesMenuStruct = [];
            this.dishesInMenu = {};

            this.isAfterDeadline = moment(this.currentDate).endOf('day').isBefore(moment());
            this.nowDate = new Date();
            console.log("===========");
            console.log(this.isAfterDeadline);
            console.log(moment().endOf('day').subtract(1, "day"));
            // this.initDate();
        }

        this.updateDishesCounts();
        this.detectFavoriteDishes();
    }


    dishDetailsDialog(dish: Dish){
        const dishDialog = this.modalsService.dishDetailsDialog(this.user, this.categories, dish);
        dishDialog.componentInstance.updated.subscribe(() => {
            this.state.getDishesByProvider(this.user.id);
        });
    }

    toggleOrderingBlock(item: MenuItem){

        let isOrderingOpened = !!this.orderingItemOpened[item.id];

        this.orderingItemCount[item.id] = 1;

        this.orderingItemOpened[item.id] = !isOrderingOpened;
    }

    processOrdering(item: MenuItem){

        this.orderingItemProcess[item.id] = true;

        let data = new OrderingRequest({
            menuItems : [
                new ObjectCounter({
                    id: item.id,
                    count : this.orderingItemCount[item.id]
                })
            ]
        });

        this.ordersApi.makeOrder(this.provider.id, this.currentMenuDate, data).then((result: Order) => {
            console.log("RESP", result);
            this.orderingItemProcess[item.id] = false;
            this.orderingItemOpened[item.id] = false;
            this.loadOrders();
            this.loadCurrentProviderMenu();
        }).catch((error) => {
            console.log("error", error);
            this.orderingItemProcess[item.id] = false;
            this.orderingItemOpened[item.id] = false;
            this.loadOrders();
            this.loadCurrentProviderMenu();
        });
    }

    changeFavoritesView(){
        this.onlyFavorites = !this.onlyFavorites;
        this.updateDishesCounts();
    }

    matchesFavoritesFilter(dish: Dish){
        return !this.onlyFavorites || (this.onlyFavorites && (this.favoriteDishes[dish.id]));
    }

    toggleFavoritedDish(dish: Dish){

        this.favoriteProcess[dish.id] = true;

        let data = new SimpleId({
            id: dish.id
        });

        this.favoritesApi.toggleFavorite(data).then((result: IdsArray) => {
            console.log("RESP", result);
            this.favoriteProcess[dish.id] = false;
            this.favorites = result.ids;
            this.detectFavoriteDishes();
        }).catch((error) => {
            console.log("error", error);
            this.favoriteProcess[dish.id] = false;
            this.loadFavorites();
        });
    }

}
