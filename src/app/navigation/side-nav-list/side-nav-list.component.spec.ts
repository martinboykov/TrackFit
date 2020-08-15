import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { SideNavListComponent } from './side-nav-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';
import { authMockService } from '../..//auth/sharing/testing/auth-stub-service';

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {}
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-toolbar', template: '' })
class MatToolbarStubComponent {}

describe('SideNavListComponent', () => {
    let component: SideNavListComponent;
    let fixture: ComponentFixture<SideNavListComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDestination: DebugElement[];
    let authService: AuthService;
    let spy: jasmine.Spy;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                SideNavListComponent,
                MatIconStubComponent,
                MatToolbarStubComponent,
                RouterLinkDirectiveStub,
            ],
            providers: [{ provide: AuthService, useValue: authMockService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavListComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        linkDestination = fixture.debugElement.queryAll(
            By.directive(RouterLinkDirectiveStub)
        );
        routerLinks = linkDestination.map((de) =>
            de.injector.get(RouterLinkDirectiveStub)
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
