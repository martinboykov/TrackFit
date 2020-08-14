import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import { AuthService } from '../../auth/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthMockService } from '../../auth/sharing/testing/auth-stub-service';

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {}
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-toolbar', template: '' })
class MatToolbarStubComponent {}
@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {
    @Input() drawer;
}

const authMockService = {
    authListener: () => {},
    authChange: new BehaviorSubject<boolean>(false),
    logout: () => {},
};

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDestination: DebugElement[];
    // let authMockService: AuthMockService;
    let authService: AuthService;
    beforeEach(async(() => {
        // authMockService = new AuthMockService();
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                HeaderComponent,
                HeaderStubComponent,
                MatIconStubComponent,
                MatToolbarStubComponent,
                RouterLinkDirectiveStub,
            ],
            // providers: [{ provide: AuthService, useValue: AuthMockService }],
            providers: [{ provide: AuthService, useValue: authMockService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        linkDestination = fixture.debugElement.queryAll(
            By.directive(RouterLinkDirectiveStub)
        );
        routerLinks = linkDestination.map((de) =>
            de.injector.get(RouterLinkDirectiveStub)
        );
        authService = TestBed.inject(AuthService);
    });

    // it('should create', fakeAsync(() => {
        // const spy = jasmine.createSpy();
        // authMockService.authChange.subscribe(spy);
        // tick(500);
    //     expect(component).toBeTruthy();
    // }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
