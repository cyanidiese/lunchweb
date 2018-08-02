import {Injectable, EventEmitter, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {FormGroup} from '@angular/forms';


import {User} from '../classes/models/user';
import {Office} from '../classes/models/office';
import {Category} from '../classes/models/category';
import {Dish} from '../classes/models/dish';

import {AuthStateService} from './auth-state.service';
import {GoogleAnalyticsService} from './google-analytics.service';
import {LocStorageService} from './loc-storage.service';

import {ApiService} from './api.service';
import {MasterService} from './api/master.service';
import {OfficesService} from './api/offices.service';
import {ProvidersService} from './api/providers.service';
import {CategoriesService} from './api/categories.service';
import {DishesService} from './api/dishes.service';

import {ModalsService} from '../modules/reusable/modals/modals.service';
import {RequestError} from '../classes/errors/request-error';
import {AuthLoginResponse} from '../classes/responses/auth-login-response';

@Injectable()
export class StateService {

    private user: User = null;

    private offices: Office[] = [];
    private providers: User[] = [];
    private categories: Category[] = [];
    private dishes: Dish[] = [];

    private pageRoleType: string;
    private pageType: string;

    private screenOffsets: any = {};

    private routeParamsEnv: any = {};

    private routeQuerySubscription: any;

    private loggedIn: boolean = false;

    public loggedInUpdated$: EventEmitter<boolean> = new EventEmitter();
    public pageTypeUpdated$: EventEmitter<string> = new EventEmitter();
    public pageRoleTypeUpdated$: EventEmitter<string> = new EventEmitter();
    public userUpdated$: EventEmitter<User> = new EventEmitter();
    public officesUpdated$: EventEmitter<Office[]> = new EventEmitter();
    public providersUpdated$: EventEmitter<User[]> = new EventEmitter();
    public categoriesUpdated$: EventEmitter<Category[]> = new EventEmitter();
    public dishesUpdated$: EventEmitter<Dish[]> = new EventEmitter();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorage: LocStorageService,
                private modalsService: ModalsService,
                private titleService: Title,
                private metaService: Meta,
                private googleAnalyticsService: GoogleAnalyticsService,
                private auth: AuthStateService,
                private apiService: ApiService,
                private masterApi: MasterService,
                private officesApi: OfficesService,
                private providersApi: ProvidersService,
                private categoriesApi: CategoriesService,
                private dishesApi: DishesService,
                @Inject(DOCUMENT) private document) {

        this.googleAnalyticsService.setIsBrowserSide(this.isBrowserSide());

        this.routeQuerySubscription = this.route.queryParams.subscribe(params => {

        });

        this.auth.loggedInUpdated$.subscribe(loggedIn => this.updateLoggedIn(loggedIn));

        this.auth.detectIfLoggedIn();
    }

    public updateLoggedIn(loggedIn: boolean): void {

        if (!loggedIn) {
            this.user = null;

            this.detectCorrectRoute();
        }
        this.updateUserProfile(this.user);
        if (!this.loggedIn && loggedIn) {
            this.getUserProfile();
            this.getOffices();
            this.getCategories();
            this.getProviders();
        }
        this.loggedIn = loggedIn;
        this.loggedInUpdated$.emit(this.loggedIn);
    }

    //==============================================================

    getUserProfile() {
        this.masterApi.getProfile().then((response: User) => {

            this.updateUserProfile(response);

        }).catch(error => {
            this.checkErrorType(error);
        });
    }

    getCurrentUserProfile(): User {
        return this.user;
    }

    updateUserProfile(user: User): void {

        this.user = user;
        this.userUpdated$.emit(this.user);
        this.detectCorrectRoute();
    }

    //==============================================================

    getOffices() {
        this.officesApi.getOffices().then((response: Office[]) => {

            this.updateOffices(response);

        }).catch(error => {
            this.checkErrorType(error);
        });
    }

    getCurrentOffices(): Office[] {
        return this.offices;
    }

    updateOffices(offices: Office[]): void {

        this.offices = offices;
        this.officesUpdated$.emit(this.offices);
    }

    //==============================================================

    getCategories() {
        this.categoriesApi.getCategories().then((response: Category[]) => {

            this.updateCategories(response);

        }).catch(error => {
            this.checkErrorType(error);
        });
    }

    getCurrentCategories(): Category[] {
        return this.categories;
    }

    updateCategories(categories: Category[]): void {

        this.categories = categories;
        this.categoriesUpdated$.emit(this.categories);
    }

    //==============================================================

    getProviders() {
        this.providersApi.getProviders().then((response: User[]) => {

            this.updateProviders(response);

        }).catch(error => {
            this.checkErrorType(error);
        });
    }

    getCurrentProviders(): User[] {
        return this.providers;
    }

    updateProviders(providers: User[]): void {

        this.providers = providers;
        this.providersUpdated$.emit(this.providers);
    }

    //==============================================================

    getDishesByProvider(providerId) {

        this.dishesApi.getDishes(providerId).then((response: Dish[]) => {

            this.updateDishes(response);

        }).catch(error => {

            this.checkErrorType(error);
        });
    }

    getCurrentDishes(): Dish[] {
        return this.dishes;
    }

    updateDishes(dishes: Dish[]): void {

        this.dishes = dishes;
        this.dishesUpdated$.emit(this.dishes);
    }

    //==============================================================

    logOut() {

        const confirmation = this.modalsService.confirmationDialog('Log Out', 'Are you really sure want to log out?', 'Log Out');

        confirmation.afterClosed().subscribe(
            confirmed => {
                if (confirmed) {
                    this.auth.logOut();
                }
            }
        );
    }

    detectCorrectRoute() {

        if (!this.user) {

            this.cleanUpData();

            this.pageRoleType = 'login';

            this.redirectToRoute(['/'])
        }
        else {

            if (this.user && this.user.role && this.user.role.name != this.pageRoleType) {
                this.pageRoleType = this.user.role.name;

                this.redirectToRoute(['/' + this.user.role.name])
            }
        }
    }

    cleanUpData() {

        this.offices = [];
        this.providers = [];
        this.categories = [];
        this.dishes = [];
    }

    //==============================================================

    isBrowserSide() {
        return this.auth.isBrowserSide();
    }

    getRouteParamsEnv() {
        return this.routeParamsEnv;
    }

    scrollBodyTo(position) {
        this.document.documentElement.scrollTop = this.document.body.scrollTop = position;
    }

    public updatePageRoleType(pageRoleType: string): void {

        this.pageRoleType = pageRoleType;
        this.pageRoleTypeUpdated$.emit(pageRoleType);
        this.detectCorrectRoute();
    }

    public updatePageType(pageType: string): void {

        this.pageType = pageType;
        this.pageTypeUpdated$.emit(pageType);

        if (this.isBrowserSide()) {
            setTimeout(() => {
                this.scrollBodyTo(0);
            }, 500);
        }

        this.setCorrectDocumentTitle();
    }

    public getLoggedIn(): boolean {
        return this.loggedIn;
    }

    public getCurrentPageType(): string {
        return this.pageType;
    }

    //==============================================================
    //=======================   ROUTER  ============================
    //==============================================================

    redirectToRoute(pathParams, queryParams?: any) {

        queryParams = (queryParams) ? queryParams : {};

        this.router.navigate(pathParams, queryParams);
    }


    //==============================================================
    //==================   DOCUMENT TITLE  =========================
    //==============================================================

    public getBaseUrl(withoutProtocol?: boolean) {

        return (withoutProtocol ? '' : this.document.location.protocol + '//') + this.document.location.hostname + (this.document.location.port ? ':' + this.document.location.port : '');

    }

    public makeUrl(base, queryParams?) {

        let url = base;

        if (queryParams) {
            url = url + '?' + Object.keys(queryParams).map(function (key) {
                return [key, queryParams[key]].map(encodeURIComponent).join('=');
            }).join('&');
        }

        return url;
    }

    public setCorrectDocumentTitle() {

        let siteTitle = 'Lunch';
        let siteAuctionTitle = 'Mobile Lunch Ordering';
        let defaultTitle = siteAuctionTitle + ' | ' + siteTitle;
        let newTitle = defaultTitle;
        let auctionPageSubtitle = '';

        let baseUrl = this.getBaseUrl();

        let ogTitle = 'Mobile Lunch Platform | Lunch';
        let ogUrl = baseUrl;
        let ogImage = 'https://lh3.googleusercontent.com/uiYA8FoF_ghTBsZ_QTRUAylYimM86FurQlVNsMaWdA5XT7HQgclGktOSjsBtGj1JfkKD=w300-rw';
        let ogDescription = 'Silent Lunch Made Easy';

        this.titleService.setTitle(newTitle);
        this.metaService.updateTag({property: 'og:title', content: newTitle});
        this.metaService.updateTag({property: 'og:url', content: ogUrl});
        this.metaService.updateTag({property: 'og:image', content: ogImage});
        this.metaService.updateTag({property: 'og:description', content: ogDescription});
        this.metaService.updateTag({property: 'description', content: ogDescription});

        this.googleAnalyticsService.setTitle(newTitle);
    }


    //==============================================================
    //=======================   OFFSET  ============================
    //==============================================================

    getOffsetOfElement(el) {
        let _x = 0;
        let _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {top: _y, left: _x};
    }

    setAuctionScreenOffset(auctionId, pageOffset) {
        this.screenOffsets[auctionId] = pageOffset;
    }

    getAuctionScreenOffset(auctionId) {

        let offsetValue = this.screenOffsets[auctionId];

        if (offsetValue) {
            if ((offsetValue + '').indexOf('item-box') !== -1) {
                return this.getOffsetOfElement(this.document.getElementById(offsetValue)).top;
            }
            else {
                return offsetValue;
            }
        }
        else {
            return 0;
        }
    }

    clearAuctionScreenOffset() {
        this.screenOffsets = {};
    }

    scrollToElementById(elementId) {
        let offset = this.getOffsetOfElement(this.document.getElementById(elementId)).top;
        if (offset) {
            this.scrollBodyTo(offset);
        }
    }

    //==============================================================
    //================  GOOGLE ANALYTICS  ==========================
    //==============================================================


    emitGAEvent(eventCategory: string, eventAction: any, eventLabel: string = null, eventValue: number = null) {

        this.googleAnalyticsService.emitEvent(eventCategory, eventAction, eventLabel, eventValue);
    }

    setGAPageView(url: string) {

        this.googleAnalyticsService.setPageView(url);
    }

    //==============================================================
    //===================  AUTH ERROR  =============================
    //==============================================================

    checkErrorType(error : RequestError | AuthLoginResponse, showPopup?: boolean) {

        if(showPopup){
            const confirmation = this.modalsService.confirmationDialog(error["name"] ? error["name"] : "Error", error.message);
        }
    }


}
