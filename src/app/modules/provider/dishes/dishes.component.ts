import { Component, OnInit } from '@angular/core';

import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {Office} from '../../../classes/models/office';
import {Dish} from '../../../classes/models/dish';

import {StateService} from '../../../services/state.service';
import {DishesService} from '../../../services/api/dishes.service';
import {Menu} from '../../../classes/models/menu';
import {RequestError} from '../../../classes/errors/request-error';
import {ModalsService} from '../../reusable/modals/modals.service';
import {MatSnackBar} from '@angular/material';
import {GeneralResponse} from '../../../classes/responses/general-response';

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

    dishesCounts: any = {};

    dishesTypes = [
        "Dishes",
        "Removed Dishes"
    ];

    selectedCat = {
        0 : "all",
        1 : "all"
    };

    isCardView : boolean = false;

    constructor(private state: StateService,
                private dishesApi: DishesService,
                private modalsService: ModalsService,
                public snackBar: MatSnackBar) {
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
        this.updateDishesCounts();
    }

    updateDishes(dishes: Dish[]){
        this.dishes = dishes;
        this.updateDishesCounts();
    }

    updateDishesCounts(){
        if(this.dishes.length && this.categories.length) {
            let dishesCounts = {};

            for(let i = 0; i < this.dishesTypes.length; i++){

                dishesCounts[i] = {};

                for(let j = 0; j < this.categories.length; j++){
                    let catId = this.categories[j].id;
                    dishesCounts[i][catId] = this.dishes.filter(dish => ((dish.categoryId == catId) && (dish.isRemoved == !!i))).length;
                }
                dishesCounts[i]["all"] = this.dishes.filter(dish => (dish.isRemoved == !!i)).length;

            }

            this.dishesCounts = dishesCounts;
        }
        else{
            this.dishesCounts = {};
        }
    }

    dishDetailsDialog(dish: Dish){
        const dishDialog = this.modalsService.dishDetailsDialog(this.user, this.categories, dish);
    }

    toggleRemovingDish(dish: Dish){

        let modalTitle = 'Remove dish';
        let modalMessage = 'Are you sure to remove this dish? It will be not able for orders and new menu but remain in inventory';
        let modalButton = 'Remove it';

        if(dish.isRemoved){
            modalTitle = 'Restore dish';
            modalMessage = 'Are you sure to restore this dish?';
            modalButton = 'Restore it';
        }

        const confirmation = this.modalsService.confirmationDialog(modalTitle, modalMessage, modalButton);

        confirmation.afterClosed().subscribe(
            confirmed => {
                if (confirmed) {
                    this.dishesApi.deleteDish(this.user.id, dish.id).then((response: GeneralResponse) => {

                        this.snackBar.open(response.message, '', {
                            duration: 2000,
                        });
                        this.state.getDishesByProvider(this.user.id);

                    }).catch((error : RequestError) => {

                        console.log("ERROR!!");
                        console.log(error);

                        this.state.checkErrorType(error, true);
                    });
                }
            }
        );
    }
}
