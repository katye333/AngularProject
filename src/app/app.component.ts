import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // Store the currently selected feature
    loadedFeature = 'recipe';

    // Update the currently selected feature to the feature received as an argument
    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
