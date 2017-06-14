import { User } from './user';
export interface Logininfo {
    id?: number;
    user?: User;
    token?: string;
    ip?: string;
}