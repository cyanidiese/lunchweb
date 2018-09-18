import {Injectable} from '@angular/core';
import {Http, Headers, Request, Response, RequestMethod} from '@angular/http';
import {AuthStateService} from './auth-state.service';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map'
// import {Observable} from 'rxjs-compat/observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    constructor(private http: Http, private auth: AuthStateService) {
    }

    public asset(path: string): Promise<any> {
        return this.request('Get', '/assets/data/' + path + '.json', [], [], true);
    }

    public outer(path: string): Promise<any> {
        return this.request('Get', path, [], [], true, true);
    }

    public get(path: string, params?: any, body?: any): Promise<any> {
        return this.request('Get', path, params, body);
    }

    public post(path: string, params?: any, body?: any): Promise<any> {
        return this.request('Post', path, params, body);
    }

    public put(path: string, params?: any, body?: any): Promise<any> {
        return this.request('Put', path, params, body);
    }

    public delete(path: string, params?: any, body?: any): Promise<any> {
        return this.request('Delete', path, params, body);
    }

    public request(verb: string, path: string, params?: any, body?: any, directPath?: boolean, notJson?: boolean): Promise<any> {

        return new Promise((resolve, reject) => {

            if (params === undefined) {
                params = {};
            }

            if(!notJson) {
                params['web_app'] = true;
            }

            let headers = {
                'Accept': 'application/json',
            };

            if (body === undefined || verb === 'Get') {
                body = '';
            } else {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            if (this.auth.isAuthorized() && !notJson) {
                headers['Authorization'] = 'Bearer ' + this.auth.getToken();
            }


            let url = (directPath) ? path : environment.apiBase + path;
            let queryString = this.buildCanonicalQueryString(params, path);
            if (queryString !== '') {
                url += '?' + queryString;
            }

            let ngheaders = new Headers();

            Object.keys(headers).forEach((key) => {
                ngheaders.append(key, headers[key]);
            });

            let requestData = {
                method: RequestMethod[verb],
                headers: ngheaders,
                url: url
            };

            if (!(body === undefined || verb === 'Get')) {
                requestData['body'] = body;
            }

            console.log(url);
            console.log(requestData);

            let request = new Request(requestData);

            this.http.request(request)
                .map((res: Response) => this.processResponse(res, notJson))
                .subscribe(
                    (response: any) => resolve(response),
                    (error: any) => reject(this.processResponse(error, notJson))
                );

        });
    }

    private processResponse(resp, notJson){
        return notJson ? resp : resp.json();
    }

    private buildCanonicalQueryString(queryParams: any, path:string) {
        if (Object.keys(queryParams).length < 1) {
            return '';
        }

        let sortedQueryParams: Array<any> = [];
        for (let property in queryParams) {
            if (queryParams.hasOwnProperty(property)) {
                sortedQueryParams.push(property);
            }
        }
        sortedQueryParams.sort();

        let canonicalQueryString = '';
        for (let i = 0; i < sortedQueryParams.length; i++) {
            let paramValue = queryParams[sortedQueryParams[i]];
            if((typeof paramValue === "string") && (paramValue.indexOf("'") !== -1) && (path != '/publicorganization')) {
                paramValue = paramValue.split("'").join("\\'");
            }
            canonicalQueryString += sortedQueryParams[i] + '=' + encodeURIComponent(paramValue) + '&';
        }
        return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
    }



}


