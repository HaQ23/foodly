import { Component } from '@angular/core';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { RestaurantDto } from './../../../../shared/model/api-models';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { ToastOptions } from 'src/app/shared/ui/toast/toast';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent extends ModalBase<RestaurantDto> {
  private _restaurant: RestaurantDto;

  private toastData: ToastOptions = {
    type: 'success',
    description: 'Skopiowano do schowka.',
    positionX: 'right',
    positionY: 'top',
    autoHide: true,
    visibilityTime: 3000,
  }


  constructor(
    private readonly clipboard: Clipboard,
    private readonly toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: RestaurantDto) => (this._restaurant = data));
  }

  get restaurant() {
    return this._restaurant;
  }

  copyAddressToClipboard() {
    this.clipboard.copy(
      `${this._restaurant.city} - ${this._restaurant.street} ${this._restaurant.buildingNumber} \nWojewództwo ${this._restaurant.province}, ${this._restaurant.postCode}`
    );
    this.toastService.showToast(this.toastData);
  }

  nextConfirm() {
    return true;
  }
  nextReject() {
    return true;
  }
}
