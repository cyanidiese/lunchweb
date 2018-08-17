import { Component, OnInit } from '@angular/core';
import {User} from '../../../../classes/models/user';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'lunch-provider-switcher',
  templateUrl: './provider-switcher.component.html',
  styleUrls: ['./provider-switcher.component.scss']
})
export class ProviderSwitcherComponent implements OnInit {

    user: User = null;
    providers: User[] = [];

    selectedProviderId = 0;

    constructor(private state: StateService) {
    }

    ngOnInit() {

        this.state.userUpdated$.subscribe(user => this.updateUser(user));
        this.state.providersUpdated$.subscribe(providers => this.updateProviders(providers));

        this.updateUser(this.state.getCurrentUserProfile());
        this.updateProviders(this.state.getCurrentProviders());
    }

    checkProvidersChanges() {
        if(this.user && this.providers && this.providers.length){
            this.selectedProviderId = this.user ? this.user.providerId : this.providers[0].id;
        }
        else{
            this.selectedProviderId = 0;
        }
    }

    setProvider(providerId) {
        if(providerId != this.selectedProviderId) {
            this.selectedProviderId = providerId;
            this.state.updateUserProvider(providerId);
        }
    }

    updateUser(user: User){

        this.user = user;
        this.checkProvidersChanges();
    }

    updateProviders(providers: User[]){

        this.providers = providers;
        this.checkProvidersChanges();
    }

}
