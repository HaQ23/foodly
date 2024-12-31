import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantSetupComponent } from './restaurant-setup.component';
const routes: Routes = [
  {
    path: '',
    component: RestaurantSetupComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantSetupRoutingModule {}
