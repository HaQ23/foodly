import { Component } from '@angular/core';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';
import { ModalService } from 'src/app/shared/ui/modal/modal.service';
import { ProductService } from '../product.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss'],
})
export class DeleteProductModalComponent extends ModalBase<number> {
  productId: number;

  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {
    super();

    this.subject$.subscribe((data: number) => {
      this.productId = data;
    });
  }

  nextConfirm(): void {
    this.asyncRequest(
      this.productService.deleteProduct(this.productId)
    ).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          description: 'Pomyślnie usunięto produkt',
        });
        this.modalService.close();
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          description: 'Wystąpił błąd podczas usuwania produktu',
        });
        this.modalService.close();
      },
    });
  }
  nextReject(): void {
    this.modalService.close();
  }
}
