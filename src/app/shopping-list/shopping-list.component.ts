import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})

// inject the ShoppingListService
export class ShoppingListComponent implements OnInit {

    shoppingListState: Observable<{ingredients: Ingredient[]}>;

    // inject the service 
    constructor(private store: Store<fromShoppingList.AppState>) { }
    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');
    }

    onEditItem(index: number) {
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }
}
