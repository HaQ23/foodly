import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalBase } from './modal.base';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private instances: { [key: number]: ModalBase<any> } = {};
  private activeInstance: ModalBase<any>;
  public viewContainerRef: ViewContainerRef;
  constructor() {}

  openModal<T extends ModalBase>(component: Type<T>): ModalBase<any> {
    const componentRef = this.viewContainerRef.createComponent(component);
    if (this.getModalInstancesAmount() > 0) {
      this.activeInstance.componentRef.location.nativeElement.firstChild.firstChild.classList.add(
        'modal-disabled'
      );
    }
    [
      this.activeInstance,
      this.activeInstance.componentRef,
      this.instances[this.getModalInstancesAmount()],
    ] = [componentRef.instance, componentRef, componentRef.instance];

    return this.activeInstance;
  }

  confirm() {
    this.activeInstance.nextConfirm();
  }

  reject() {
    this.activeInstance.nextReject();
  }

  close() {
    this.deleteModal();
  }

  private deleteModal() {
    this.activeInstance.componentRef.destroy();
    delete this.instances[this.getModalInstancesAmount() - 1];
    this.activeInstance = Object.values(this.instances).pop() || null;
    if (this.activeInstance !== null) {
      this.activeInstance.componentRef.location.nativeElement.firstChild.firstChild.classList.remove(
        'modal-disabled'
      );
    }
  }

  getModalInstancesAmount() {
    return Object.entries(this.instances).length;
  }
}
