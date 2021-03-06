import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class AuthService {
    token: string;
    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/signin']);
            })
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.router.navigate(['/recipes']);
                firebase.auth().currentUser.getToken()
                    .then((token: string) => this.token = token);
            })
            .catch(error => console.log(error));
    }

    getToken() {
        // asynchronous to get token from local storage and check if still valid
        firebase.auth().currentUser.getToken()
            .then((token: string) => this.token = token);

        return this.token;
    }

    isAuthenticated(): boolean {
        // const tokenValid = this.token != null;
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut()
            .then(response => {
                this.router.navigate(['/']);
            });
        this.token = null;

    }
}
