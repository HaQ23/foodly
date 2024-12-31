import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { AddProductCategoryModalComponent } from './add-product-category-modal/add-product-category-modal.component';
import { DeleteProductCategoryModalComponent } from './delete-product-category-modal/delete-product-category-modal.component';
import { EditProductCategoryModalComponent } from './edit-product-category-modal/edit-product-category-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddProductCategoryModalComponent,
    DeleteProductCategoryModalComponent,
    EditProductCategoryModalComponent,
  ],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, SharedModule],
  exports: [AddProductCategoryModalComponent]
})
export class ProductCategorySetupModule {}
