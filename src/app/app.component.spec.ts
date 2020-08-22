import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { authMockService } from './auth/sharing/testing/auth-stub-service';
// tslint:disable-next-line: component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        // authMockService = new AuthMockService();
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent, RouterOutletStubComponent],
            providers: [{ provide: AuthService, useValue: authMockService }],

        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create the app', () => {
        expect(app).toBeTruthy();
    });
});
