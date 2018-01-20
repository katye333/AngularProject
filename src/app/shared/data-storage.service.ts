import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService) { }

    // must return the put request because it is an Observable
    storeRecipes() {
        return this.http.put('https://ng-recipe-book-d219c.firebaseio.com/data.json', this.recipeService.getRecipes());
    }

    retrieveRecipes() {
        return this.http.get('https://ng-recipe-book-d219c.firebaseio.com/data.json')
            .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
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
