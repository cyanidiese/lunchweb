import { Component, OnInit } from '@angular/core';
import {Category} from '../../../classes/models/category';
import {User} from '../../../classes/models/user';
import {StateService} from '../../../services/state.service';
import {Office} from '../../../classes/models/office';

@Component({
  selector: 'lunch-provider-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {

    user: User = null;

    constructor(private state: StateService) {
    }

    ngOnInit() {
        this.state.updatePageRoleType("provider");
        this.state.updatePageType("lookup");

        this.state.userUpdated$.subscribe(user => this.updateUser(user));

        this.updateUser(this.state.getCurrentUserProfile());
    }

    logOut() {
        this.state.logOut();
    }

    updateUser(user: User) {
        this.user = user;
    }

}
