import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/modules/restaurant/restaurant.service';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-delete-restaurant-modal',
  templateUrl: './delete-restaurant-modal.component.html',
  styleUrls: ['./delete-restaurant-modal.component.scss'],
})
export class DeleteRestaurantModalComponent extends ModalBase {
  restaurantId: number;
  constructor(
    private restaurantService: RestaurantService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {
    super();
    this.subject$.subscribe((id: number) => {
      this.restaurantId = id;
    });
  }
  override nextConfirm(): void {
    this.asyncRequest(
      this.restaurantService.deleteRestaurant(this.restaurantId)
    ).subscribe({
      next: (value) => {
        this.toastService.showToast({
          type: 'success',
          description: 'Restauracja została usunięta',
        });
        this.subject.next(true);
        this.modalService.close();
      },
      error: (err) => {
        this.toastService.showToast({
          type: 'error',
          description: 'Wystąpił błąd podczas usuwania restauracji',
        });
        this.modalService.close();
      },
    });
  }
  override nextReject(): void {
    this.modalService.close();
  }
}
