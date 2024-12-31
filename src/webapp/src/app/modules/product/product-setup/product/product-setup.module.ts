import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [
    AddProductModalComponent,
    DeleteProductModalComponent,
    EditProductModalComponent,
  ],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, SharedModule],
  exports: [AddProductModalComponent]
})
export class ProductSetupModule {}
