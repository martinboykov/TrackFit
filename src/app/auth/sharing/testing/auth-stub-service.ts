import { AbstractMockObservableService } from 'src/app/testing';
import { BehaviorSubject } from 'rxjs';

export class AuthMockService extends AbstractMockObservableService {
    authChange = new BehaviorSubject<boolean>(false);

    authListener() {
        return this;
    }
    logout() {
        return this;
    }
}
