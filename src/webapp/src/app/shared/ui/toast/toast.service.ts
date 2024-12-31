import { Injectable } from '@angular/core';
import { Toast, ToastOptions } from './toast';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultToastValues: ToastOptions = {
    type: 'success',
    description: '',
    positionX: 'right',
    positionY: 'top',
    autoHide: true,
    visibilityTime: 3000,
  };
  toast: BehaviorSubject<Toast> = new BehaviorSubject<Toast>({
    ...this.defaultToastValues,
    visible: false,
  });
  private toastTimeout: any;

  showToast(toastData: ToastOptions) {
    const data = {
      ...this.defaultToastValues,
      ...toastData,
      visible: true,
    } satisfies Toast;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    if (this.toast.getValue().visible) {
      this.closeToast();
      this.toastTimeout = setTimeout(() => {
        this.handleDisplay(data);
      }, 300);
    } else {
      this.handleDisplay(data);
    }
  }
  private handleDisplay(toastData: Toast) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    if (this.toast.getValue().autoHide) {
      this.toastTimeout = setTimeout(() => {
        this.closeToast();
      }, this.toast.getValue().visibilityTime);
    }
    this.toast.next({ ...toastData });
  }
  closeToast() {
    this.toast.next({ ...this.toast.getValue(), visible: false });
  }

  constructor() {}
}
