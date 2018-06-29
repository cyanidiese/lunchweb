import {Component, OnInit} from '@angular/core';

import {StateService} from '../../../../services/state.service';

@Component({
    selector: 'lunch-admin-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private state: StateService) {
    }

    ngOnInit() {
    }

    logOut(){
        this.state.logOut();
    }

}
