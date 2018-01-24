import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

// create routes for main components (recipes and shopping list)
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
];

// useHash localhost:4200/#/
// use only the part after the hashtag
@NgModule({
    imports: [
        // preloading lazy loaded routes
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
