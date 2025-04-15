import { Action } from "rxjs/internal/scheduler/Action";

export class ButtonProperties {
    constructor(public icon: string, public link?: string, public action?: (param: string) => void){}

    get ciao(): () => void {
        return () => {
          console.log('ciao mighele');
        };
      }
}