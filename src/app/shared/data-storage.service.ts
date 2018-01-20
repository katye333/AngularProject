import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';


@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService) { }

    // must return the put request because it is an Observable
    storeRecipes() {
        return this.http.put('https://ng-recipe-book-d219c.firebaseio.com/data.json', this.recipeService.getRecipes());
    }
}
