import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantCategoryDto } from 'src/app/shared/model/api-models';
import { RestaurantCategorySetupService } from './restaurant-category-setup.service';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ModifyRestaurantCategoryModalComponent } from './modify-restaurant-category-modal/modify-restaurant-category-modal.component';
import { DeleteRestaurantCategoryModalComponent } from './delete-restaurant-category-modal/delete-restaurant-category-modal.component';

@Component({
  selector: 'app-restaurant-category-setup',
  templateUrl: './restaurant-category-setup.component.html',
  styleUrls: ['./restaurant-category-setup.component.scss'],
})
export class RestaurantCategorySetupComponent implements OnInit, OnDestroy {
  sub: Subscription;
  categoriesArr: RestaurantCategoryDto[];
  addCategoryForm: FormGroup;
  categoryData: RestaurantCategoryDto;
  constructor(
    private restaurantCategoryService: RestaurantCategorySetupService,
    private modalService: ModalService
  ) {
    this.sub = this.restaurantCategoryService.categoriesChanged.subscribe(
      (arr) => {
        this.categoriesArr = arr;
      }
    );
    this.addCategoryForm = new FormGroup(
      {
        name: new FormControl('', { validators: [Validators.required] }),
        icon: new FormControl('', { validators: [Validators.required] }),
      },
      { updateOn: 'blur' }
    );
  }
  ngOnInit(): void {
    this.restaurantCategoryService.getAllCategories().subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSubmit() {
    if (this.addCategoryForm.valid) {
      this.categoryData = {
        ...this.addCategoryForm.value,
      };
      this.restaurantCategoryService
        .addCategory(this.categoryData)
        .subscribe((response: RestaurantCategoryDto) => {
          this.addCategoryForm.reset();
        });
    }
  }
  openModifyModal(category: RestaurantCategoryDto): void {
    const ref = this.modalService.openModal(
      ModifyRestaurantCategoryModalComponent
    );
    ref.subject.next({ ...category });
  }
  openDeleteCategoryModal(category: RestaurantCategoryDto): void {
    const ref = this.modalService.openModal(
      DeleteRestaurantCategoryModalComponent
    );
    ref.subject.next({ ...category });
  }
  get controls() {
    return this.addCategoryForm.controls;
  }
}
