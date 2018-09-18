import {Component, Input, OnInit, OnChanges} from '@angular/core';

import * as moment from 'moment-timezone';

import {Order} from '../../../../classes/models/order';
import {User} from '../../../../classes/models/user';
import {StateService} from '../../../../services/state.service';
import {Menu} from '../../../../classes/models/menu';
import {RequestError} from '../../../../classes/errors/request-error';
import {ProvidersService} from '../../../../services/api/providers.service';
import {Office} from '../../../../classes/models/office';
import {Category} from '../../../../classes/models/category';
import {FormControl} from '@angular/forms';
import {Dish} from '../../../../classes/models/dish';
import {ModalsService} from '../../modals/modals.service';

@Component({
    selector: 'lunch-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnChanges {

    @Input() providerId: number;

    orders: Order[] = [];
    categories: Category[] = [];
    offices: Office[] = [];

    user: User = null;
    provider: User = null;

    fromDateStr: string = '';
    fromDate: Date = new Date();

    toDateStr: string = '';
    toDate: Date = new Date();

    mastersControl = new FormControl();
    officesControl = new FormControl();

    mastersList: User[] = [];
    dishesList: Dish[] = [];
    officesList: Office[] = [];

    mastersIds: number[] = [];
    officesIds: number[] = [];
    dishesIds: number[] = [];
    dates: string[] = [];

    sortByMaster: boolean = true;

    constructor(private state: StateService,
                private providerApi: ProvidersService,
                private modalsService : ModalsService) {

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));

        this.updateMenuDate();

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());

    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.loadProviderOrders();
    }

    updateUser(user: User) {
        this.user = user;
    }

    updateOffices(offices: Office[]) {
        this.offices = offices;
    }

    updateCategories(categories: Category[]) {
        this.categories = categories;
    }

    formatDate(date: Date | string, format: string): string {
        return moment(date).format(format);
    }

    updateMenuDate() {
        let from = this.formatDate(this.fromDate, 'YYYY-MM-DD');
        let to = this.formatDate(this.toDate, 'YYYY-MM-DD');
        if ((from != this.fromDateStr) || (to != this.toDateStr)) {
            this.fromDateStr = from;
            this.toDateStr = to;
            this.loadProviderOrders();
        }
    }

    loadProviderOrders(){

        if(this.providerId && this.fromDateStr && this.toDateStr) {
            this.providerApi.getHistory(this.providerId, this.fromDateStr, this.toDateStr).then((response: Order[]) => {
                console.log("RESP",response);

                this.orders = response;
                this.updateOrderingData();

            }).catch((error: RequestError) => {

                console.log("ERR",error);
                this.orders = [];
                this.updateOrderingData();

                this.state.checkErrorType(error);
            });
        }
    }

    updateOrderingData(){
        let mastersIds = [];
        let mastersList = [];
        let dishesIds = [];
        let dishesList = [];
        let officesIds = [];
        let officesList = [];

        let dates = [];

        console.log("========");
        if(this.orders && this.orders.length){
            for(let i = 0; i < this.orders.length; i++){

                let order = this.orders[i],
                    master = order.master,
                    dish = order.item.dish,
                    date = this.formatDate(order.date, 'YYYY-MM-DD');

                if(!dishesIds.includes(dish.id)){
                    dishesIds.push(dish.id);
                    dishesList.push(dish);
                }

                if(!mastersIds.includes(master.id)){
                    mastersIds.push(master.id);
                    mastersList.push(master);
                    if(!officesIds.includes(master.office.id)){
                        officesIds.push(master.office.id);
                        officesList.push(master.office);
                    }
                }

                console.log(date);

                if(!dates.includes(date)){
                    dates.push(date);
                }
            }
        }

        this.mastersIds = mastersIds;
        this.mastersList = mastersList;
        this.dishesIds = dishesIds;
        this.dishesList = dishesList;
        this.officesIds = officesIds;
        this.officesList = officesList;

        this.dates = dates.sort(function(a, b) {
            if (a < b) { return 1; }
            if (a > b) { return -1; }
            return 0;
        });
    }

    changeSortingMode(sortByMaster: boolean){
        this.sortByMaster = !sortByMaster;
    }

    dishDetailsDialog(dish: Dish){
        this.modalsService.dishDetailsDialog(this.user, this.categories, dish);
    }

    masterDetailsDialog(master: User){
        this.modalsService.userDetailsDialog(this.user, this.offices, master);
    }

}
