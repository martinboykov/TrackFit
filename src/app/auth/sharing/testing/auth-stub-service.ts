import {  of } from 'rxjs';

export const authMockService = {
    authListener: () => {},
    authChange: of(true),
    logout: () => 'logged out',
    login: () => 'logged in',
};

export const AngularFireAuthStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      }
    }
  };
