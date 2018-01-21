import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

// create routes for main components (recipes and shopping list)
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
];

// useHash localhost:4200/#/
// use only the part after the hashtag
@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, { useHash: true }),
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
