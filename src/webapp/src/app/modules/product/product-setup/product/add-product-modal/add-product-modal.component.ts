import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ProductCategoryDto,
  ProductDto,
} from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';

import { ProductService } from '../product.service';

import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { ProductCategoryService } from '../../category/product-category.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent
  extends ModalBase<ProductDto>
  implements OnInit
{
  setupForm: FormGroup;
  productDto: ProductDto;
  productCategoryList: ProductCategoryDto[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productService: ProductService,
    private readonly toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: ProductDto) => {
      this.productDto = data;
    });

    this.setupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [null, Validators.required],
      category: [null],
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

  addCategory(categoryId: number) {
    const category = this.formBuilder.group({
      id: [categoryId, Validators.required],
    });

    (this.setupForm.get('categories') as FormArray).push(category);
  }

  nextConfirm(): void {
    if (this.setupForm.valid) {
      if (this.setupForm.get('category').value != null) {
        this.addCategory(this.setupForm.get('category').value);
      }
      this.productDto = { ...this.productDto, ...this.setupForm.value };

      this.asyncRequest(
        this.productService.createProduct(this.productDto)
      ).subscribe({
        next: (response: ProductDto) => {
          this.setupForm.reset();
          this.toastService.showToast({
            type: 'success',
            description: 'Produkt został dodany pomyślnie.',
          });
          this.subject.next(response);
        },
        error: () => {
          this.setupForm.reset();
          this.toastService.showToast({
            type: 'success',
            description: 'Wystąpił błąd podczas dodawania produktu.',
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
