import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    // must return the put request because it is an Observable
    storeRecipes() {
        // const headers = new HttpHeaders().set('Authorization', 'Bearer afsfheuthuieg');

        // return this.httpClient.put('https://ng-recipe-book-d219c.firebaseio.com/data.json',
        //     this.recipeService.getRecipes(), {
        //         observe: 'body',
        //         params: new HttpParams().set('auth', token)
        //     });
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-d219c.firebaseio.com/data.json',
            this.recipeService.getRecipes(), {
                // reportProgress: true
            });
        return this.httpClient.request(req);
    }

    retrieveRecipes() {
        const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>('https://ng-recipe-book-d219c.firebaseio.com/data.json', {
            observe: 'body',
            responseType: 'json'
        }).map(
            (recipes) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}
