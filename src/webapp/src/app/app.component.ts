import { ModalService } from './shared/ui/modal/modal.service';
import { Component, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {
    this.modalService.viewContainerRef = this.viewContainerRef;
  }
}
