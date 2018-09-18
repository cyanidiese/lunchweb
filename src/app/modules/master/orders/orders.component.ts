import {Component, OnInit} from '@angular/core';
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
import {OrdersService} from '../../../services/api/orders.service';
import {CommentsService} from '../../../services/api/comments.service';

import {ModalsService} from '../../reusable/modals/modals.service';

@Component({
    selector: 'lunch-master-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    user: User = null;

    offices: Office[] = [];
    categories: Category[] = [];
    orders: Order[] = [];

    provider: User = null;
    menu: Menu = null;

    currentDate: string;
    menuDate: Date = new Date();

    currentMenuDate: string = '2018-08-15';

    dishesCounts: any = {};

    totalCount: number = 0;
    totalPrice: number = 0;

    orderedCount: any = {};
    orderedPrice: any = {};
    orderedChangesCount: any = {};

    isAfterDeadline: boolean = false;

    orderingItemOpened: any = {};
    orderingItemProcess: any = {};
    orderingItemCount: any = {};

    constructor(private snackBar: MatSnackBar,
                private state: StateService,
                private modalsService: ModalsService,
                private dishesApi: DishesService,
                private providersApi: ProvidersService,
                private ordersApi: OrdersService,
                private commentsApi: CommentsService,
                private menusApi: MenusService) {
    }

    ngOnInit() {
        this.state.updatePageRoleType('master');
        this.state.updatePageType('menu');

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));

        this.initDate();

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());

        this.reloadProviderMenu();
    }

    reloadProviderMenu() {
        this.loadCurrentProviderMenu();
        setTimeout(() => {
            this.reloadProviderMenu();
        }, 30000);
    }


    logOut() {
        this.state.logOut();
    }

    updateUser(user: User) {
        this.user = user;
        this.detectProvider();
    }

    updateOffices(offices: Office[]) {
        this.offices = offices;
    }

    updateCategories(categories: Category[]) {
        this.categories = categories;
        this.updateOrderedCount();
    }

    formatDate(date: Date, format: string): string {
        return moment(date).format(format);
    }

    initDate() {
        this.menuDate = new Date();
        this.updateMenuDate();
    }

    updateMenuDate() {
        let currentDate = this.formatDate(this.menuDate, 'YYYY-MM-DD');
        if (currentDate != this.currentMenuDate) {
            this.currentMenuDate = currentDate;
            this.loadCurrentProviderMenu();
            this.loadOrders();
        }
    }

    detectProvider() {
        if (this.user) {
            let providers = this.state.getCurrentProviders();
            let provider = providers.filter(prov => prov.id == this.user.providerId).pop();

            let needToReloadMenu = (provider && (!this.provider || (this.provider.id != provider.id)));

            this.provider = provider;

            if (needToReloadMenu) {

                this.loadCurrentProviderMenu();
                this.loadOrders();

            }
        }
    }

    loadCurrentProviderMenu() {

        if (this.provider) {

            this.menusApi.getMenuByDate(this.provider.id, this.currentMenuDate).then((result: Menu) => {
                console.log('RESULT', result);

                this.updateMenu(result);

            }).catch((error: RequestError) => {

                console.log('ERROR', error);

                this.updateMenu(null);

                this.snackBar.open(error.message, '', {
                    duration: 4000,
                });
            });
        }
    }

    loadOrders() {

        if (this.provider) {

            this.ordersApi.getOrdersByDate(this.provider.id, this.currentMenuDate).then((result: Order[]) => {

                console.log('ORDERS', result);

                this.orders = result;

                this.updateOrderedCount();

            }).catch((error: RequestError) => {

                console.log('ORDERS error', error);

                this.orders = [];

                this.updateOrderedCount();
            });
        }
    }

    updateOrderedCount() {

        let orderedCount = {};
        let orderedPrice = {};
        let orderedChangesCount = {};
        let totalCount = 0;
        let totalPrice = 0;

        if (this.orders && this.orders.length) {

            for (let i = 0; i < this.orders.length; i++) {
                let order = this.orders[i];

                orderedChangesCount[order.itemId] = order.orderedCount;
                orderedCount[order.itemId] = order.orderedCount;
                orderedPrice[order.itemId] = order.price;

                totalCount += order.orderedCount;
                totalPrice += order.price;
            }
        }
        this.orderedCount = orderedCount;
        this.orderedPrice = orderedPrice;
        this.orderedChangesCount = orderedChangesCount;
        this.totalCount = totalCount;
        this.totalPrice = totalPrice;

        this.updateDishesCounts();
    }

    updateDishesCounts() {
        if (this.menu && this.menu.items && this.menu.items.length && this.categories.length) {

            let dishesCounts = {};

            for (let i = 0; i < this.categories.length; i++) {
                let catId = this.categories[i].id;
                dishesCounts[catId] = this.menu.items.filter(
                    item => ((item.dish.categoryId == catId) && this.orderedCount[item.id]
                )).length;
            }

            this.dishesCounts = dishesCounts;
        }
        else {
            this.dishesCounts = {};
        }
    }

    updateMenu(menu: Menu) {
        this.menu = menu;

        if (this.menu) {
            let menuDeadline = (this.menu.deadline.replace('T', ' ').replace('Z', ''));

            this.isAfterDeadline = moment(new Date(menuDeadline)).isBefore(moment());

        }
        else {
            this.isAfterDeadline = moment(this.currentDate).endOf('day').isBefore(moment());
        }

        this.updateOrderedCount();
    }


    dishDetailsDialog(dish: Dish) {
        const dishDialog = this.modalsService.dishDetailsDialog(this.user, this.categories, dish);
        dishDialog.componentInstance.updated.subscribe(() => {
            this.state.getDishesByProvider(this.user.id);
        });
    }

    toggleOrderingBlock(item: MenuItem) {

        let isOrderingOpened = !!this.orderingItemOpened[item.id];

        this.orderingItemCount[item.id] = 1;

        this.orderingItemOpened[item.id] = !isOrderingOpened;
    }

    processOrdering(item: MenuItem) {

        this.orderingItemProcess[item.id] = true;

        let data = new OrderingRequest({
            menuItems: [
                new ObjectCounter({
                    id: item.id,
                    count: this.orderedChangesCount[item.id] - this.orderedCount[item.id]
                })
            ]
        });
        console.log('DATA ORDER', data);
        this.ordersApi.makeOrder(this.provider.id, this.currentMenuDate, data).then((result: Order[]) => {
            console.log('RESP ORDER', result);
            this.orderingItemProcess[item.id] = false;
            this.orderingItemOpened[item.id] = false;

            console.log('ORDERS', result);

            this.orders = result;

            this.updateOrderedCount();

            this.loadCurrentProviderMenu();
        }).catch((error) => {
            console.log('error ORDER', error);
            this.orderingItemProcess[item.id] = false;
            this.orderingItemOpened[item.id] = false;
            this.loadOrders();
            this.loadCurrentProviderMenu();
        });
    }

    processRemovingOrder(order: Order) {

        this.orderingItemProcess[order.itemId] = true;

        console.log('REMOVE ORDER', order.id);
        this.ordersApi.removeOrder(this.provider.id, this.currentMenuDate, order.id).then((result: Order[]) => {
            console.log('RESP REMOVING', result);
            this.orderingItemProcess[order.itemId] = false;
            this.orderingItemOpened[order.itemId] = false;

            console.log('ORDERS', result);

            this.orders = result;

            this.updateOrderedCount();

            this.loadCurrentProviderMenu();

        }).catch((error) => {

            console.log('error ORDER removing', error);
            this.orderingItemProcess[order.itemId] = false;
            this.orderingItemOpened[order.itemId] = false;
            this.loadOrders();
            this.loadCurrentProviderMenu();
        });
    }

}
