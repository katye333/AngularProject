import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    // Create an EventEmitter with a string passed to it (generic type)
    // @Output allows us to use/listen to this event from the parent component
    @Output() featureSelected = new EventEmitter<string>();

    // Implement onSelect() function with a parameter based on what is selected
    onSelect(feature: string) {

        // Emit custom event: featureSelected
        // This property holds the event emitter as a value to emit the event whenever
        // The value of `feature` is obtained from the parameter passed in the onSelect(...) method calls
        this.featureSelected.emit(feature);
    }
}
