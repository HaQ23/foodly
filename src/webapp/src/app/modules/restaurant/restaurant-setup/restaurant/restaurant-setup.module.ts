import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantSetupComponent } from './restaurant-setup.component';
import { RestaurantSetupRoutingModule } from './restaurant-setup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteRestaurantModalComponent } from './delete-restaurant-modal/delete-restaurant-modal.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { EditRestaurantModalComponent } from './edit-restaurant-modal/edit-restaurant-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    RestaurantSetupComponent,
    DeleteRestaurantModalComponent,
    EditRestaurantModalComponent,
  ],
  imports: [
    CommonModule,
    RestaurantSetupRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule,
  ],
})
export class RestaurantSetupModule {}
