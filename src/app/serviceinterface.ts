import { Observable } from 'rxjs/Observable';
export interface Serviceinterface {
    get(id: number): any;
    gets(): any;
    add(obj: any): any;
    search(value: string): any;
    delete(value: any): any;
    setHost(nh: string): void;
}