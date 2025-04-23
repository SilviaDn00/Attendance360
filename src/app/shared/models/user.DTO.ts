import { IUser } from "./user.interface";

export class User implements IUser {

    public enabled: boolean = true;

    constructor(public id: string, public name: string, public surname: string, public email: string, public password: string,
        public role: string, public department: string) { }
}
