import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    recipes = [];
    isLoggedIn: boolean;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
    ngOnInit() {
        console.log(this.getTokenInput());
    }

    onSaveData() {

        // on click of "Save Data" dropdown element
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => console.log(response),
            (error) => console.log(error)
        );
    }

    onFetchData() {
        this.dataStorageService.retrieveRecipes();
    }

    getTokenInput() {
        this.authService.isAuthenticated() ? this.isLoggedIn = true : this.isLoggedIn = false;
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.isLoggedIn = false;
        this.authService.logout();
    }
}
