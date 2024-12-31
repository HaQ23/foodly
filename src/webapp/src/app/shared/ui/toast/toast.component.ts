import { Component, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';
import { Toast } from './toast';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimationTop', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        })
      ),
      transition('open => close', [animate('0.3s')]),
      transition('close => open', [animate('0.3s')]),
    ]),
    trigger('toastAnimationBottom', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        })
      ),
      transition('open => close', [animate('0.3s')]),
      transition('close => open', [animate('0.3s')]),
    ]),
  ],
})
export class ToastComponent implements OnDestroy {
  toast: Toast;
  private toastSub: Subscription;
  constructor(private toastSerive: ToastService) {
    this.toastSub = this.toastSerive.toast.subscribe((response) => {
      this.toast = { ...response };
    });
  }
  ngOnDestroy(): void {
    this.toastSub.unsubscribe();
  }
  closeToast() {
    this.toastSerive.closeToast();
  }
}
