import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductCategorySetupModule } from './product-setup/category/product-category-setup.module';
import { ProductSetupModule } from './product-setup/product/product-setup.module';




@NgModule({
  declarations: [
    ProductPreviewComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
  ],
  exports: [ProductSetupModule, ProductCategorySetupModule]
})
export class ProductModule { }
