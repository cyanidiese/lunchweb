import { Component, OnInit } from '@angular/core';

import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {Office} from '../../../classes/models/office';
import {Dish} from '../../../classes/models/dish';

import {StateService} from '../../../services/state.service';
import {DishesService} from '../../../services/api/dishes.service';

@Component({
  selector: 'lunch-provider-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {


    user: User = null;

    offices: Office[] = [];
    categories: Category[] = [];
    dishes: Dish[] = [];

    constructor(private state: StateService,
                private dishesApi: DishesService) {
    }

    ngOnInit() {
        this.state.updatePageRoleType("provider");
        this.state.updatePageType("dishes");

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));
        this.state.dishesUpdated$.subscribe(dishes => this.updateDishes(dishes));

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());
        this.updateDishes(this.state.getCurrentDishes());
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

}