import {Inject, Component, ViewChild, ViewContainerRef, OnInit, OnDestroy, ComponentRef} from '@angular/core';
import {NgZone} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Subject} from "rxjs";

import {User} from "./classes/models/user";
import {StateService} from "./services/state.service";

@Component({
    selector: 'lunch-root',
    templateUrl: './lunch.component.html',
    styleUrls: ['../assets/sass/main.scss', './lunch.component.scss']
})
export class LunchComponent implements OnInit, OnDestroy {

    @ViewChild('modalOutlet', {read: ViewContainerRef}) bcModalOutlet: ViewContainerRef;

    title = 'lunch works!';

    pageType = '';

    routeParamsEnv: any = {};

    hideAllExceptMain = false;

    receiptPage = false;

    isAnyAuctionPage = false;

    environment: any;

    numberOfModals: number = 0;

    user: User = null;

    topClass: string = '';
    bodyClass: string = '';
    headerClass: string = '';
    headerResponseClass: string = '';
    mainClass: string = '';

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private ngZone: NgZone,
                private state: StateService,
                private route: ActivatedRoute,
                private router: Router,
                containerRef: ViewContainerRef,
                @Inject(DOCUMENT) private document) {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.state.setGAPageView(event.urlAfterRedirects);
            }
        });

        this.state.pageTypeUpdated$.subscribe(pageType => this.onPageTypeUpdated(pageType));
        this.state.userUpdated$.subscribe(user => this.onUserUpdated(user));

        this.onPageTypeUpdated(this.state.getCurrentPageType());
        this.onUserUpdated(this.state.getCurrentUserProfile());
        this.onRouteParamsEnvUpdated(this.state.getRouteParamsEnv());


        if(this.state.isBrowserSide()) {
            window.onresize = (e) => {
                this.ngZone.run(() => {

                    this.checkClasses();
                });
            };
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onRouteParamsEnvUpdated(routeParamsEnv: any) {
        this.routeParamsEnv = routeParamsEnv;

    }

    onUserUpdated(user: User) {
        this.user = user;
        let loggedInClass = 'logged-in';
        let loggedOutClass = 'logged-out';
        if(this.document) {
            if (this.user) {
                this.document.body.classList.add(loggedInClass);
                this.document.body.classList.remove(loggedOutClass);
            }
            else {
                this.document.body.classList.add(loggedOutClass);
                this.document.body.classList.remove(loggedInClass);
            }
        }
    }

    onNumberOfModalsUpdated(numberOfModals: number) {
        this.numberOfModals = numberOfModals;
        let modalsClass = 'body-with-modals';
        if(this.document) {
            if (this.numberOfModals > 0) {
                this.document.body.classList.add(modalsClass);
            }
            else {
                this.document.body.classList.remove(modalsClass);
            }
        }
    }

    onPageTypeUpdated(pageType: string) {
        this.pageType = pageType;
        this.isAnyAuctionPage = (pageType =='auction' || pageType =='items' || pageType =='item' || pageType =='donations' || pageType == 'tickets' || pageType == 'registration');
        this.hideAllExceptMain = ((pageType == 'single-ticket') || (pageType == 'single-receipt'));
        this.receiptPage = ((pageType == 'single-receipt'));

        this.checkClasses();
    }

    checkClasses() {

        let topClass = '';
        if(this.receiptPage){
            // topClass += ' no-padding-vh receipt-body';
            topClass += ' receipt-body';
        }

        if(this.hideAllExceptMain){
            topClass += ' empty-body';
        }

        this.topClass = topClass;

        let bodyClass = '';
        if(this.hideAllExceptMain){
            bodyClass += ' absolutely-hidden';
        }
        if(this.pageType == 'user'){
            bodyClass += ' main-header_collapsed grey-bg';
        }
        this.bodyClass = bodyClass;


        let headerClass = '';
        if(this.isAnyAuctionPage){
            headerClass = 'nav-panel_auction';
        }
        if(this.pageType == 'auctions' || this.pageType == 'main'){
            headerClass = 'nav-panel_event';
        }

        if(this.pageType == 'organization' || this.pageType == 'organizations' || this.pageType == 'locations' || this.pageType == 'user'){
            headerClass = 'nav-panel_event-short';
        }

        if(this.pageType == 'location'){
            headerClass = 'nav-panel_location';
        }

        this.headerClass = headerClass;


        let mainClass = '';
        if(this.pageType != 'user'){
            mainClass += ' main';
        }
        if((this.pageType == 'auctions')
            || (this.pageType == 'registration')
            || (this.pageType == 'organizations')
            || (this.pageType == 'donations')
            || (this.pageType == 'tickets')
            || (this.pageType == 'items')
            || (this.pageType == 'user')
        ){
            mainClass += ' grey-bg';
        }
        this.mainClass = mainClass;
    }

}
