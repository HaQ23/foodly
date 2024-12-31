import { DeleteRestaurantModalComponent } from './../restaurant-setup/restaurant/delete-restaurant-modal/delete-restaurant-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { RestaurantDetailsModalComponent } from '../restaurant-details/restaurant-details-modal/restaurant-details-modal.component';
import { RestaurantService } from '../restaurant.service';
import {
  ProductCategoryDto,
  ProductDto,
} from './../../../shared/model/api-models';
import { ProductPreviewComponent } from '../../product/product-preview/product-preview.component';
import { ProductService } from '../../product/product-setup/product/product.service';
import { ProductCategoryService } from '../../product/product-setup/category/product-category.service';
import { AddProductModalComponent } from '../../product/product-setup/product/add-product-modal/add-product-modal.component';
import { AddProductCategoryModalComponent } from '../../product/product-setup/category/add-product-category-modal/add-product-category-modal.component';
import { EditRestaurantModalComponent } from '../restaurant-setup/restaurant/edit-restaurant-modal/edit-restaurant-modal.component';

enum ProductModalType {
  ADD_PRODUCT,
  ADD_PRODUCT_CATEGORY,
}

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss'],
})
export class RestaurantPageComponent implements OnInit {
  restaurantId: number;
  restaurantData: RestaurantDto;
  products: ProductDto[];
  productCategories: ProductCategoryDto[];
  serwis: RestaurantService;

  protected productsByCategory: { [categoryId: number]: ProductDto[] } = {};
  protected uncategorizedProducts: ProductDto[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly restaurantService: RestaurantService,
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly modalService: ModalService
  ) {
    this.restaurantId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fetchRestaurantData();
  }

  fetchRestaurantData() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (response: RestaurantDto) => {
        this.restaurantData = response;
        this.fetchRestaurantProductData();
      },
      error: () => this.router.navigate(['/']),
    });
  }

  fetchRestaurantProductData() {
    this.productService
      .getAllProductsByRestaurantId(this.restaurantId)
      .subscribe((response: ProductDto[]) => {
        this.products = response;
        this.fetchRestaurantProductCategoryData();
      });
  }

  fetchRestaurantProductCategoryData() {
    this.productCategoryService
      .getAllProductCategoryByRestaurantId(this.restaurantId)
      .subscribe((response: ProductCategoryDto[]) => {
        this.productCategories = response;
        this.prepareProducts(this.productCategories);
      });
  }

  prepareProducts(categories: ProductCategoryDto[]): void {
    this.uncategorizedProducts = this.products.filter(
      (product) => product.categories.length === 0
    );

    categories.forEach((category) => {
      this.productsByCategory[category.id] = this.products.filter((product) =>
        product.categories.some((c) => c.id === category.id)
      );
    });
  }

  addProductByCategories(
    categories: ProductCategoryDto[],
    product: ProductDto
  ): void {
    if (categories?.length > 0) {
      categories.forEach((category) =>
        this.productsByCategory[category.id].push(product)
      );
      return;
    }
    this.uncategorizedProducts.push(product);
  }

  openCreateProductModal() {
    const ref = this.modalService.openModal(AddProductModalComponent);
    this.handleModalSubject(ref, ProductModalType.ADD_PRODUCT);
  }

  openCreateProductCategoryModal() {
    const ref = this.modalService.openModal(AddProductCategoryModalComponent);
    this.handleModalSubject(ref, ProductModalType.ADD_PRODUCT_CATEGORY);
  }

  openRestaurantDetailsModal() {
    const ref = this.modalService.openModal(RestaurantDetailsModalComponent);
    ref.subject.next(this.restaurantData);
  }

  openProductPreviewModal(productId: number) {
    const ref = this.modalService.openModal(ProductPreviewComponent);
    ref.subject.next(this.products.find((product) => product.id === productId));
  }

  openRestaurantEditModal() {
    const ref = this.modalService.openModal(EditRestaurantModalComponent);
    ref.subject.next(this.restaurantData);
    ref.subject$.subscribe(
      (data: RestaurantDto) => (this.restaurantData = data)
    );
  }
  openRestaurantDeleteModal() {
    const ref = this.modalService.openModal(DeleteRestaurantModalComponent);
    ref.subject.next(this.restaurantData.id);
    ref.subject$.subscribe(() => this.router.navigate(['/']));
  }

  handleModalSubject(ref: ModalBase, modalType: ProductModalType): void {
    ref.subject.next({ restaurantId: this.restaurantId });
    ref.subject$.subscribe((data) =>
      modalType === ProductModalType.ADD_PRODUCT
        ? this.products.push(data) &&
          this.addProductByCategories(data.categories, data)
        : this.productCategories.push(data) &&
          (this.productsByCategory[data.id] = [])
    );
  }
}
