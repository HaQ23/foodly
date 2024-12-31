import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryDto, ProductDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';

import { ProductService } from '../product.service';

import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { ProductCategoryService } from '../../category/product-category.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent
  extends ModalBase<ProductDto>
  implements OnInit
{
  editForm: FormGroup;
  productDto: ProductDto;
  productCategoryList: ProductCategoryDto[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: ProductDto) => {
      this.productDto = data;
      this.editForm.patchValue(data);
    });

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [null, Validators.required],
      categories: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.productCategoryService
      .getAllProductCategoryByRestaurantId(this.productDto.restaurantId)
      .subscribe((data) => {
        this.productCategoryList = data;
      });
  }

  nextConfirm(): void {
    if (this.editForm.valid) {
      this.productDto = { ...this.productDto, ...this.editForm.value };
      this.asyncRequest(
        this.productService.updateProduct(this.productDto, this.productDto.id)
      ).subscribe({
        next: () => {
          this.toastService.showToast({
            type: 'success',
            description: 'Pomyślnie zaatkualizowano produkt',
          });
          this.modalService.close();
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            description: 'Wystąpił błąd podczas atkualizowania produktu',
          });
          this.modalService.close();
        },
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  nextReject(): void {
    this.modalService.close();
  }
}
