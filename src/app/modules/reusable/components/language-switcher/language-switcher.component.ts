import {Component, OnInit} from '@angular/core';
import {User} from '../../../../classes/models/user';
import {StateService} from '../../../../services/state.service';

@Component({
    selector: 'lunch-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

    user: User;

    selectedLanguage = '';

    languages: string[] = [];

    constructor(private state: StateService) {
    }

    ngOnInit() {

        this.state.userUpdated$.subscribe(user => this.updateUser(user));

        this.updateUser(this.state.getCurrentUserProfile());
    }

    checkUserChanges() {
        if(this.user && this.user.office && this.user.office.title){
            this.languages = Object.keys(this.user.office.title).map((val : string) => {
                return val.toUpperCase();
            });
            this.selectedLanguage = this.user.lang.toUpperCase();
        }
    }

    setLanguage(lang) {
        if(lang != this.selectedLanguage) {
            this.selectedLanguage = lang;
            this.state.updateUserLanguage(lang);
        }
    }

    updateUser(user: User){

        this.user = user;
        this.checkUserChanges();
    }

}
