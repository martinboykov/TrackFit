import { firebase } from './environment.firebase';

export const environment = {
    production: false,
    ...firebase,
};
