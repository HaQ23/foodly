import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  RestaurantCategoryDto,
  RestaurantDto,
} from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { RestaurantSetupService } from '../restaurant-setup.service';
import { atLeastOneCategorySelectedValidator } from 'src/app/shared/util/validators/at-least-one-category-selected.validator';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { RestaurantCategorySetupService } from '../../category/restaurant-category-setup.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-edit-restaurant-modal',
  templateUrl: './edit-restaurant-modal.component.html',
  styleUrls: ['./edit-restaurant-modal.component.scss'],
})
export class EditRestaurantModalComponent
  extends ModalBase<RestaurantDto>
  implements OnInit, AfterViewInit
{
  @ViewChild('searchTerm') searchTerm: ElementRef;
  editForm: FormGroup;
  restaurantDto: RestaurantDto;
  restaurantCategoryList: RestaurantCategoryDto[];
  filteredRestaurantCategory: RestaurantCategoryDto[];

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private restaurantSetupService: RestaurantSetupService,
    private restaurantCaregoryService: RestaurantCategorySetupService,
    private toastService: ToastService
  ) {
    super();
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      buildingNumber: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      categories: this.formBuilder.array(
        [],
        [atLeastOneCategorySelectedValidator()]
      ),
    });

    this.subject$.subscribe((data: RestaurantDto) => {
      this.restaurantDto = { ...data };
      this.editForm.patchValue(data);
      data.categories.forEach((category) => {
        this.addFormControlToCategories(category.code);
      });
    });
  }

  ngOnInit(): void {
    this.restaurantCaregoryService
      .getAllCategories()
      .subscribe((data: RestaurantCategoryDto[]) => {
        this.restaurantCategoryList = [...data];
        this.filteredRestaurantCategory = [...data];
      });
  }

  ngAfterViewInit(): void {
    this.prepareSearchTerm();
  }

  prepareSearchTerm(): void {
    fromEvent<KeyboardEvent>(this.searchTerm.nativeElement, 'input')
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTermValue) => {
        this.filterCategories(searchTermValue);
      });
  }

  addFormControlToCategories(code: string) {
    (this.editForm.get('categories') as FormArray).push(
      new FormControl({ code: code })
    );
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.editForm.get('categories') as FormArray;
    const codeToRemove = event.target.value;
    this.editForm.markAsDirty();
    if (event.target.checked) {
      this.addFormControlToCategories(codeToRemove);
    } else {
      const index = formArray.controls.findIndex(
        (control) => control.value.code === codeToRemove
      );
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  isChecked(restaurantCategoryCode: string): boolean {
    return this.restaurantDto.categories.some(
      (category) => category.code === restaurantCategoryCode
    );
  }

  filterCategories(searchTermValue: string) {
    this.filteredRestaurantCategory = this.restaurantCategoryList.filter(
      (category) => category.name.toLowerCase().includes(searchTermValue)
    );
  }

  nextConfirm(): void {
    if (this.editForm.valid && this.editForm.dirty) {
      this.asyncRequest(
        this.restaurantSetupService.updateRestaurant(
          this.editForm.value,
          this.restaurantDto.id
        )
      ).subscribe({
        next: (data: RestaurantDto) => {
          this.toastService.showToast({
            type: 'success',
            description: 'Pomyślnie zaktualizowano dane restauracji',
          });
          this.subject.next(data);
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            description: 'Wystąpił błąd podczas atkualizowania restauracji',
          });
        },
        complete: () => this.modalService.close(),
      });
    }
  }

  nextReject(): void {
    this.modalService.close();
  }
}
