import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantDetailsModalComponent } from './restaurant-details/restaurant-details-modal/restaurant-details-modal.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';

@NgModule({
  declarations: [RestaurantComponent, RestaurantDetailsModalComponent],
  imports: [CommonModule, SharedModule, RestaurantRoutingModule, ModalModule],
})
export class RestaurantModule {}
