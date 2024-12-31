import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ProductCategoryService } from '../product-category.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-add-product-category-modal',
  templateUrl: './add-product-category-modal.component.html',
  styleUrls: ['./add-product-category-modal.component.scss'],
})
export class AddProductCategoryModalComponent extends ModalBase<ProductCategoryDto> {
  setupForm: FormGroup;
  productCategoryDto: ProductCategoryDto;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly toastService: ToastService
  ) {
    super();

    this.subject$.subscribe(
      (data: ProductCategoryDto) => (this.productCategoryDto = data)
    );

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
        this.productCategoryService.createProductCategory(
          this.productCategoryDto
        )
      ).subscribe({
        next: (response) => {
          this.setupForm.reset();
          this.toastService.showToast({
            type: 'success',
            description: 'Kategoria produktów została dodana pomyślnie.',
          });
          this.subject.next(response);
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            description: 'Wystąpił błąd podczas dodawanai kategorii produtków.',
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
