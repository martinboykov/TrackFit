import { Directive, Input, HostListener } from '@angular/core';

export { RouterLink } from '@angular/router';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[routerLink]',
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
