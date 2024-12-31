import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ProductCategoryService } from '../product-category.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-edit-product-category-modal',
  templateUrl: './edit-product-category-modal.component.html',
  styleUrls: ['./edit-product-category-modal.component.scss'],
})
export class EditProductCategoryModalComponent extends ModalBase<ProductCategoryDto> {
  setupForm: FormGroup;
  productCategoryDto: ProductCategoryDto;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private productCategoryService: ProductCategoryService,
    private toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: ProductCategoryDto) => {
      this.productCategoryDto = data;
      this.setupForm.patchValue(data);
    });

    this.setupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  nextConfirm(): void {
    if (this.setupForm.valid) {
      this.productCategoryDto = {
        ...this.productCategoryDto,
        ...this.setupForm.value,
      };
      this.asyncRequest(
        this.productCategoryService.updateProductCategory(
          this.productCategoryDto,
          this.productCategoryDto.id
        )
      ).subscribe({
        next: () => {
          this.toastService.showToast({
            type: 'success',
            description: 'Pomyślnie zaaktualizowano produkt',
          });
          this.modalService.close();
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            description: 'Wystąpił błąd podczas aktualizowania produktu',
          });
        },
      });
    } else {
      this.setupForm.markAllAsTouched();
    }
  }

  nextReject(): void {
    this.modalService.close();
  }
}
