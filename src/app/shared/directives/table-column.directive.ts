import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableColumn]'
})
export class TableColumnDirective {
  
  @Input('appTableColumn') templateName!:string

  public readonly template = inject(TemplateRef);


}
