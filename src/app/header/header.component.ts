import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    recipes = [];

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
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

    onLogout() {
        this.authService.logout();
    }
}
