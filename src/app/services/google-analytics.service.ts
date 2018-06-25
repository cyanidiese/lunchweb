import {Injectable} from "@angular/core";

@Injectable()
export class GoogleAnalyticsService {

    private ga: any;
    private title: any;

    private isBrowserSide: boolean = false;

    constructor() {
        this.init();
    }

    private init() {
        if(this.isBrowserSide && !this.ga) {
            this.ga = (<any>window).ga;
        }
    }

    private setAttribute(name: string, value: any) {
        this.ga('set', name, value);
    }

    public setIsBrowserSide(isBrowserSide: boolean) {
        this.isBrowserSide = isBrowserSide;
        this.init();
    }

    public setTitle(value: any) {
        this.init();
        if(this.ga) {
            if (value != this.title) {
                this.ga('set', 'title', value);
                this.title = value;
            }
        }
    }

    public setPageView(url: string) {
        this.init();
        if(this.ga) {
            this.setAttribute('page', url);
            this.ga('send', 'pageview');
            this.setAttribute('location', url);
        }
    }

    public emitEvent(eventCategory: string,
                     eventAction: any,
                     eventLabel: string = null,
                     eventValue: number = null) {
        this.init();
        if(this.ga) {
            this.ga('send', 'event', {
                eventCategory: eventCategory,
                eventLabel: eventLabel,
                eventAction: eventAction,
                eventValue: eventValue
            });
        }
    }
}
