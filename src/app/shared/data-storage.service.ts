import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
// import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }
    // must return the put request because it is an Observable
    storeRecipes() {
        const token = this.authService.getToken();

        firebase.database().ref('data/').set(this.recipeService.getRecipes());
        return this.http.put('https://ng-recipe-book-d219c.firebaseio.com/data.json?auth=' + token, this.recipeService.getRecipes());
    }

    retrieveRecipes() {
        const recipesRef = firebase.database().ref('data/');

        recipesRef.on('value', (snapshot) => {
            this.recipeService.setRecipes(snapshot.val().map(
                (response) => {
                    const recipes: Recipe[] = response;
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ));
        });


        // this.http.get('https://ng-recipe-book-d219c.firebaseio.com/data.json?auth=' + token)
        //     .map(
        //     (response: Response) => {
        //         const recipes: Recipe[] = response.json();
        //         for (const recipe of recipes) {
        //             if (!recipe['ingredients']) {
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //         return recipes;
        //     })
        //     .subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipeService.setRecipes(recipes);
        //     });


    }
}
