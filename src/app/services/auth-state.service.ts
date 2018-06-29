import {Inject, Injectable, EventEmitter, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {LocStorageService} from './loc-storage.service';

@Injectable()
export class AuthStateService {

    private loggedIn: boolean;

    private tokenName: string = 'auth-token';
    private _token;

    public loggedInUpdated$: EventEmitter<boolean>;

    constructor(private localStorage: LocStorageService,
                @Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId: Object) {

        this.loggedInUpdated$ = new EventEmitter();


    }

    isBrowserSide() {

        return isPlatformBrowser(this.platformId);
    }

    detectIfLoggedIn() {

        if (!this.isBrowserSide()) {
            return false;
        }

        let token = this.localStorage.get(this.tokenName);

        this.loggedIn = (token && (token != '') && (token != undefined));
        if (this.loggedIn) {
            this._token = token;
        }
        this.loggedInUpdated$.emit(this.loggedIn);

        return this.loggedIn;
    }

    isAuthorized() {
        return this.loggedIn;
    }

    getToken() {
        return this._token;
    }

    setToken(token) {
        this._token = token;
        this.localStorage.set(this.tokenName, token);
    }

    removeToken() {
        this._token = '';
        this.localStorage.remove(this.tokenName);
    }

    logIn(token) {
        this.setToken(token);
        this.loggedIn = true;
        this.loggedInUpdated$.emit(this.loggedIn);
    }

    logOut() {
        this.removeToken();
        this.loggedIn = false;
        this.loggedInUpdated$.emit(this.loggedIn);
    }

}
