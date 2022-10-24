/* eslint no-use-before-define: 0 */
import { Directive, HostListener } from "@angular/core";
import { Input } from "@angular/core";

@Directive({
  selector: '[routerLink]'
})
 export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
