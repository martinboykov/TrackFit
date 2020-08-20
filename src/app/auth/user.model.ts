export interface AuthData {
    email: string;
    password: string;
}
export interface Roles {
    admin: boolean;
    editor: boolean;
    subscriber: boolean;
}
export interface UserI {
    uid?: string;
    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    dataCreated: Date | any;
    roles: Roles;
}

const cloudStoreInitAvatarURL = './assets/images/profile.png';

export class User implements UserI {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    dataCreated: Date | any;
    roles: Roles;
    constructor(userData) {
        this.uid = userData.uid;
        this.email = userData.email;
        this.displayName = userData.displayName;
        this.photoURL = userData.photoURL || cloudStoreInitAvatarURL;
        this.dataCreated = new Date();
        this.roles = {
            admin: false,
            editor: false,
            subscriber: true,
        };
    }
}
