import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    // must return the put request because it is an Observable
    storeRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.put('https://ng-recipe-book-d219c.firebaseio.com/data.json?auth=' + token, this.recipeService.getRecipes());
    }

    retrieveRecipes() {
        const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>('https://ng-recipe-book-d219c.firebaseio.com/data.json?auth=' + token)
            .map(
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
