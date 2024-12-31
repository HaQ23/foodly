import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { RestaurantCategorySetupService } from '../restaurant-category-setup.service';
import { RestaurantCategoryDto } from 'src/app/shared/model/api-models';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-delete-restaurant-category-modal',
  templateUrl: './delete-restaurant-category-modal.component.html',
  styleUrls: ['./delete-restaurant-category-modal.component.scss'],
})
export class DeleteRestaurantCategoryModalComponent extends ModalBase {
  restaurantCategoryDto: RestaurantCategoryDto;
  constructor(
    private modalService: ModalService,
    private restaurantCategorySetupService: RestaurantCategorySetupService,
    private toastService: ToastService
  ) {
    super();
    this.subject = new Subject<RestaurantCategoryDto>();
    this.subject$ = this.subject.asObservable();
    this.subject$.subscribe((response: RestaurantCategoryDto) => {
      this.restaurantCategoryDto = { ...response };
    });
  }

  override nextConfirm(): void {
    this.restaurantCategorySetupService;
    this.asyncRequest(
      this.restaurantCategorySetupService.deleteCategory(
        this.restaurantCategoryDto.code
      )
    ).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          description: 'Pomyślnie usunięto kategorie',
        });
        this.modalService.close();
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          description: 'Wystąpił błąd podczas usuwania kategorii',
        });
        this.modalService.close();
      },
    });
  }
  override nextReject(): void {
    this.modalService.close();
  }
}
