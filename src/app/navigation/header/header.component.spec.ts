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
import { of } from 'rxjs';
import { authMockService } from '../..//auth/sharing/testing/auth-stub-service';

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {}
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-toolbar', template: '' })
class MatToolbarStubComponent {}


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDestination: DebugElement[];
    // let authMockService: AuthMockService;
    let authService: AuthService;
    let spy: jasmine.Spy;
    beforeEach(async(() => {
        // authMockService = new AuthMockService();
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                HeaderComponent,
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
    // it('can get RouterLink from template', () => {
    //     expect(routerLinks.length).toBe(3, 'should have 3 routerLink');
    //     expect(routerLinks[0].linkParams).toEqual(['/']);
    // });
    // it('can click button width RouterLink in template', () => {
    //     const linkDebug = linkDestination[0];
    //     const linkEl = routerLinks[0];
    //     expect(linkEl.navigatedTo).toBeNull('should not have navigated yet');
    //     linkDebug.triggerEventHandler('click', {});
    //     fixture.detectChanges();
    //     expect(linkEl.navigatedTo).toEqual(['/']);
    // });
    // it('can click button width RouterLink in template', () => {
    //     const linkDebug = linkDestination[1];
    //     const linkEl = routerLinks[1];
    //     expect(linkEl.navigatedTo).toBeNull('should not have navigated yet');
    //     linkDebug.triggerEventHandler('click', {});
    //     fixture.detectChanges();
    //     expect(linkEl.navigatedTo).toEqual(['training']);
    // });
    // it('logout to be called', fakeAsync(() => {
    //     component.isAuth = true;
    //     fixture.detectChanges();
    //     tick(500);
    //     const onLogoutLink = fixture.debugElement.query(By.css('#logout'))
    //         .nativeElement;
    //     console.log(onLogoutLink);
    //     spy = spyOn(authService, 'logout').and.callThrough();
    //     onLogoutLink.click();
    //     expect(spy).toHaveBeenCalled();
    // }));
    // it('login to be called', fakeAsync(() => {
    //     component.isAuth = false;
    //     fixture.detectChanges();
    //     tick(500);
    //     const onLoginLink = fixture.debugElement.query(By.css('#login'))
    //         .nativeElement;
    //     console.log(onLoginLink);
    //     onLoginLink.click();
    //     spy = spyOn(authService, 'login').and.callThrough();
    //     expect(spy).toHaveBeenCalled();
    // }));
});
