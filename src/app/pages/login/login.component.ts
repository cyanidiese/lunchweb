import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {AuthApiService} from '../../services/api/auth.service';
import {AuthStateService} from '../../services/auth-state.service';
import {StateService} from '../../services/state.service';
import {AuthLoginResponse} from '../../classes/responses/auth-login-response';

import {
    AuthService,
    GoogleLoginProvider
} from 'angular5-social-login';

@Component({
    selector: 'lunch-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    displayPasswordAsIs: boolean = false;
    isCurrentlyLoggingIn: boolean = false;

    loginErrorMessage: string = '';

    formErrors: any = {};


    loginForm: FormGroup;

    email = new FormControl('', [Validators.required, Validators.email]);

    constructor(private auth: AuthStateService,
                private authApi: AuthApiService,
                private state: StateService,
                private socialAuthService: AuthService) {
    }

    ngOnInit() {
        this.initInitialForms();

        // const hintPromise = googleyolo.hint({
        //     supportedAuthMethods: [
        //         "https://accounts.google.com"
        //     ],
        //     supportedIdTokenProviders: [
        //         {
        //             uri: "https://accounts.google.com",
        //             clientId: "1051139662842-p3ga3rf785q1k9jccuood965ei1t57et.apps.googleusercontent.com"
        //         }
        //     ]
        // });
    }

    public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "google"){
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform+" sign in data : " , userData);
                // Now sign-in with userData


            }
        );
    }

    getErrorMessage(key) {
        return this.formErrors[key] ? this.formErrors[key] : '';
    }


    initInitialForms() {

        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.maxLength(64),
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required
            ]))
        }, this.checkErrors.bind(this));
    }

    checkErrors(form: FormGroup) {

        let formErrors = {};

        let formControl = form.get('email');
        if (formControl && formControl.errors) {
            if (formControl.errors.required) {
                formErrors['email'] = 'You must enter a value';
            }
            if (formControl.errors.email) {
                formErrors['email'] = 'Not a valid email';
            }
        }

        this.formErrors = formErrors;
    }

    onLogIn(event: Event) {
        event.preventDefault();

        let data = this.loginForm.value;

        this.isCurrentlyLoggingIn = true;
        this.loginErrorMessage = '';

        this.authApi.logInRequest(data).then((response: AuthLoginResponse) => {

            this.isCurrentlyLoggingIn = false;

            console.log('LOGIN RESP');
            console.log(response);

            this.auth.logIn(response.token);

        }).catch((error: AuthLoginResponse) => {

            console.log('LOGIN ERR');
            console.log(error);
            this.isCurrentlyLoggingIn = false;
            this.loginErrorMessage = error.message;
            this.state.checkErrorType(error);
            // this.state.emitGAEvent('Authorization', 'Fail');
        });
    }

}
