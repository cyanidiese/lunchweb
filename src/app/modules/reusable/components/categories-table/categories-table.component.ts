import {Component, Input, OnInit} from '@angular/core';

import {Category} from '../../../../classes/models/category';

import {StateService} from '../../../../services/state.service';
import {User} from '../../../../classes/models/user';
import {ModalsService} from '../../modals/modals.service';
import {Office} from '../../../../classes/models/office';

@Component({
    selector: 'lunch-categories-table',
    templateUrl: './categories-table.component.html',
    styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

    @Input() providerId: number = 0;

    user: User = null;

    categories: Category[] = [];
    offices: Office[] = [];
    providers: User[] = [];

    displayedColumns: string[] = ['name', 'actions'];

    constructor(private state: StateService,
                private modalsService: ModalsService) {
    }

    ngOnInit() {

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.providersUpdated$.subscribe(providers => this.updateProviders(providers));
        this.state.officesUpdated$.subscribe(offices => this.updateOffices(offices));
        this.state.categoriesUpdated$.subscribe(categories => this.updateCategories(categories));

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateProviders(this.state.getCurrentProviders());
        this.updateOffices(this.state.getCurrentOffices());
        this.updateCategories(this.state.getCurrentCategories());

        if(!this.providerId){
            this.displayedColumns.splice(1, 0, "addedBy");
        }
    }

    updateUser(user: User){
        this.user = user;
    }

    updateCategories(categories: Category[]){
        this.categories = categories;
    }

    updateProviders(providers: User[]){
        this.providers = providers;
    }

    updateOffices(offices: Office[]){
        this.offices = offices;
    }

    showCategoryModal(category?: Category){
        let providerId = category ? category.providerId : this.providerId;
        const categoryDialog = this.modalsService.categoryDialog(this.user, providerId, category, this.categories, false);
        categoryDialog.componentInstance.updated.subscribe(() => {
            this.state.getCategories();
            if(this.providerId){
                this.state.getDishesByProvider(this.providerId);
            }
        });
    }

    showRemoveCategoryModal(category: Category){
        let providerId = category ? category.providerId : this.providerId;
        const categoryDialog = this.modalsService.categoryDialog(this.user, providerId, category, this.categories, true);
        categoryDialog.componentInstance.updated.subscribe(() => {
            this.state.getCategories();
            if(this.providerId){
                this.state.getDishesByProvider(this.providerId);
            }
        });
    }

    masterDetailsDialog(provider: User){
        this.modalsService.userDetailsDialog(this.user, this.offices, provider);
    }

}
