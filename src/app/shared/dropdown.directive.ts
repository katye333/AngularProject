import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // use HostBinding to bind to properties of the element the directive is placed op
    // 'class' is an array of all the classes on that element
    // this allows us to change the class of the <btn-group> 
    @HostBinding('class.open') isOpen = false;

    // listen to a click event
    // execute toggle open method to switch value of this.isOpen
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}
