import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './ui/loader/loader.component';
import { ScrollToAnchorDirective } from './util/directives/scroll-to-anchor.directive';
import { InViewportVisibleDirective } from './util/directives/in-viewport-visible.directive';
import { ReplaceSpacesPipe } from './util/pipes/replace-spaces.pipe';
import { ToastComponent } from './ui/toast/toast.component';



@NgModule({
  declarations: [LoaderComponent, ToastComponent, ScrollToAnchorDirective, InViewportVisibleDirective, ReplaceSpacesPipe],
  imports: [CommonModule],
  exports: [LoaderComponent, ToastComponent, ScrollToAnchorDirective, InViewportVisibleDirective, ReplaceSpacesPipe],
})
export class SharedModule {}
