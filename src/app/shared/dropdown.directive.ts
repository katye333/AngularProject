import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    constructor(private el: ElementRef,
        private renderer: Renderer2) { }
    // use HostBinding to bind to properties of the element the directive is placed op
    // 'class' is an array of all the classes on that element
    // this allows us to change the class of the <btn-group>
    @HostBinding('class.show') isOpen = false;

    // listen to a click event
    // execute toggle open method to switch value of this.isOpen
    @HostListener('click') toggleOpen() {
        let part = this.el.nativeElement.querySelector('.dropdown-menu');
        this.isOpen ? this.renderer.removeClass(part, 'show') : this.renderer.addClass(part, 'show');
        this.isOpen = !this.isOpen;
    }
}
