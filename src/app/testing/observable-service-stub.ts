import { Subscription } from 'rxjs';

export abstract class AbstractMockObservableService {
    // tslint:disable-next-line: variable-name
    protected _subscription: Subscription;
    // tslint:disable-next-line: variable-name
    protected _fakeContent: any;
    // tslint:disable-next-line: variable-name
    protected _fakeError: any;

    set error(err) {
        this._fakeError = err;
    }

    set content(data) {
        this._fakeContent = data;
    }

    get subscription(): Subscription {
        return this._subscription;
    }

    subscribe(
        // tslint:disable-next-line: ban-types
        next: Function,
        // tslint:disable-next-line: ban-types
        error?: Function,
        // tslint:disable-next-line: ban-types
        complete?: Function
    ): Subscription {
        this._subscription = new Subscription();
        spyOn(this._subscription, 'unsubscribe');

        if (next && this._fakeContent && !this._fakeError) {
            next(this._fakeContent);
        }
        if (error && this._fakeError) {
            error(this._fakeError);
        }
        if (complete) {
            complete();
        }
        return this._subscription;
    }
}
