import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RestaurantPageRoutingModule } from './restaurant-page-routing.module';
import { RestaurantPageComponent } from './restaurant-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductModule } from '../../product/product.module';

@NgModule({
  declarations: [RestaurantPageComponent],
  imports: [CommonModule, RestaurantPageRoutingModule, ProductModule, SharedModule],
})
export class RestaurantPageModule {}
