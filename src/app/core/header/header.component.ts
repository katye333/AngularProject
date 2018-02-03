import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    recipes = [];
    isLoggedIn = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    onSaveData() {

        // on click of "Save Data" dropdown element
        this.dataStorageService.storeRecipes().subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    onFetchData() {
        this.dataStorageService.retrieveRecipes();
    }

    getTokenInput() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
    }
}
