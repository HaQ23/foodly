import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from '../restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
  },
  {
    path: 'restaurant/setup',
    loadChildren: () =>
      import('./restaurant-setup/restaurant/restaurant-setup.module').then(
        (m) => m.RestaurantSetupModule
      ),
  },
  {
    path: 'restaurant/setup/category',
    loadChildren: () =>
      import(
        './restaurant-setup/category/restaurant-category-setup.module'
      ).then((m) => m.RestaurantCategorySetupModule),
  },
  {
    path: 'restaurant/:slug/:id',
    loadChildren: () =>
      import('./restaurant-page/restaurant-page.module').then(
        (m) => m.RestaurantPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
