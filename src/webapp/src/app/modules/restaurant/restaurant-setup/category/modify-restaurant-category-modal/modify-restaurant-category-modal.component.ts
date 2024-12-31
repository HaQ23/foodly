import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestaurantCategoryDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { RestaurantCategorySetupService } from '../restaurant-category-setup.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-modify-restaurant-category-modal',
  templateUrl: './modify-restaurant-category-modal.component.html',
  styleUrls: ['./modify-restaurant-category-modal.component.scss'],
})
export class ModifyRestaurantCategoryModalComponent extends ModalBase {
  modifyCategoryForm: FormGroup;
  ref: ModalBase;
  restaurantCategoryDto: RestaurantCategoryDto;
  constructor(
    private modalService: ModalService,
    private restaurantCategorySetupService: RestaurantCategorySetupService,
    private toastService: ToastService
  ) {
    super();
    this.subject = new Subject<RestaurantCategoryDto>();
    this.subject$ = this.subject.asObservable();
    this.modifyCategoryForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      icon: new FormControl('', {
        validators: [Validators.required],
      }),
    });
    this.subject$.subscribe((restaurantCategoryDto: RestaurantCategoryDto) => {
      if (restaurantCategoryDto) {
        this.restaurantCategoryDto = { ...restaurantCategoryDto };
        this.modifyCategoryForm.patchValue({
          name: restaurantCategoryDto.name,
          icon: restaurantCategoryDto.icon,
        });
      }
    });
  }

  override nextConfirm(): void {
    if (this.modifyCategoryForm.valid && this.modifyCategoryForm.dirty) {
      this.asyncRequest(
        this.restaurantCategorySetupService.putCategory(
          this.modifyCategoryForm.value,
          this.restaurantCategoryDto.code
        )
      ).subscribe({
        next: () => {
          this.toastService.showToast({
            type: 'success',
            description: 'Zaaktualizowano kategorie',
          });
          this.modalService.close();
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            description: 'wystąpił błąd podczas aktualizowania kategorii',
          });
          this.modalService.close();
        },
      });
    }
  }
  override nextReject(): void {
    this.modalService.close();
  }
  get controls() {
    return this.modifyCategoryForm.controls;
  }
}
