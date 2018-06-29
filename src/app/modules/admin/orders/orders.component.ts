import {Component, OnInit} from '@angular/core';
import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {StateService} from '../../../services/state.service';
import {Office} from '../../../classes/models/office';

@Component({
    selector: 'lunch-admin-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


    user: User = null;

    offices: Office[] = [];
    categories: Category[] = [];

    constructor(private state: StateService) {
    }

    ngOnInit() {
        this.state.updatePageRoleType("admin");
        this.state.updatePageType("orders");

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());
    }

    logOut() {
        this.state.logOut();
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

}
