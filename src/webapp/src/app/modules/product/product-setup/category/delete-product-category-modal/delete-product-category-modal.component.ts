import { Component } from '@angular/core';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ProductCategoryService } from '../product-category.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-delete-product-category-modal',
  templateUrl: './delete-product-category-modal.component.html',
  styleUrls: ['./delete-product-category-modal.component.scss'],
})
export class DeleteProductCategoryModalComponent extends ModalBase<number> {
  productCategoryId: number;

  constructor(
    private productCategoryService: ProductCategoryService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: number) => {
      this.productCategoryId = data;
    });
  }

  nextConfirm(): void {
    this.asyncRequest(
      this.productCategoryService.deleteProductCategory(this.productCategoryId)
    ).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          description: 'Pomyślnie usunięto kategorie produktu',
        });
        this.modalService.close();
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          description:
            '`Nie mozesz usunac kategorii poniewaz przypisane są do niej produkty`',
        }),
          this.modalService.close();
      },
    });
  }
  nextReject(): void {
    this.modalService.close();
  }
}
