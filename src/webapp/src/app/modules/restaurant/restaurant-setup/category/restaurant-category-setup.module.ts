import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCategorySetupRoutingModule } from './restaurant-category-setup-routing.module';
import { RestaurantCategorySetupComponent } from './restaurant-category-setup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyRestaurantCategoryModalComponent } from './modify-restaurant-category-modal/modify-restaurant-category-modal.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { DeleteRestaurantCategoryModalComponent } from './delete-restaurant-category-modal/delete-restaurant-category-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RestaurantCategorySetupComponent,
    ModifyRestaurantCategoryModalComponent,
    DeleteRestaurantCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    RestaurantCategorySetupRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule,
  ],
})
export class RestaurantCategorySetupModule {}
