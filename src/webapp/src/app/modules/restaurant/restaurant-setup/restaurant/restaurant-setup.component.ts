import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  RestaurantCategoryDto,
  RestaurantDto,
} from 'src/app/shared/model/api-models';

import { Router } from '@angular/router';
import { RestaurantSetupService } from './restaurant-setup.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-restaurant-setup',
  templateUrl: './restaurant-setup.component.html',
  styleUrls: ['./restaurant-setup.component.scss'],
})
export class RestaurantSetupComponent extends BaseComponent implements OnInit {
  addRestaurantForm: FormGroup;
  restaurantData: RestaurantDto;
  restaurantCategories: RestaurantCategoryDto[];

  constructor(
    private restaurantSetupService: RestaurantSetupService,
    private router: Router,
    private toastService: ToastService
  ) {
    super();
    this.addRestaurantForm = new FormGroup(
      {
        name: new FormControl('', { validators: [Validators.required] }),
        city: new FormControl('', { validators: [Validators.required] }),
        province: new FormControl('', { validators: [Validators.required] }),
        postCode: new FormControl('', { validators: [Validators.required] }),
        street: new FormControl('', { validators: [Validators.required] }),
        buildingNumber: new FormControl('', {
          validators: [Validators.required],
        }),
        categories: new FormControl('', { validators: [Validators.required] }),
      },
      { updateOn: 'blur' }
    );
  }
  ngOnInit(): void {
    this.restaurantSetupService
      .getRestaurantCategories()
      .subscribe((response) => {
        this.restaurantCategories = response;
      });
  }
  submitRestaurantForm() {
    if (this.addRestaurantForm.valid) {
      this.restaurantData = {
        ...this.addRestaurantForm.value,
        photo: 'default',
        categories: [this.addRestaurantForm.controls['categories'].value],
      };
      this.asyncRequest(
        this.restaurantSetupService.registerRestaurant(this.restaurantData)
      ).subscribe({
        next: (response) => {
          this.addRestaurantForm.reset();
          this.router.navigate(['']);
          this.toastService.showToast({
            type: 'success',
            description: 'Pomyślnie dodano restauracje',
          });
          //TODO: redirect to config restaurant page, then assign a restaurant to the currently logged in user
        },
        error: (error) => {
          this.toastService.showToast({
            type: 'error',
            description: 'Dodawanie restauracji niepowiodło się',
          });
        },
      });
    }
  }
  get controls() {
    return this.addRestaurantForm.controls;
  }
}
