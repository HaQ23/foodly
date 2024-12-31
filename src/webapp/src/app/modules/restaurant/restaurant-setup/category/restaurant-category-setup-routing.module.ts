import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantCategorySetupComponent } from './restaurant-category-setup.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantCategorySetupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantCategorySetupRoutingModule {}
