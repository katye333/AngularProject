import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})

// inject the ShoppingListService
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private subscription: Subscription;

    // inject the service 
    constructor(private slService: ShoppingListService) { }
    ngOnInit() {
        this.ingredients = this.slService.getIngredients(); // Get a copy of this array from our service

        this.subscription = this.slService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // 
    onEditItem(index: number) {
        this.slService.startedEditing.next(index);
    }
}
