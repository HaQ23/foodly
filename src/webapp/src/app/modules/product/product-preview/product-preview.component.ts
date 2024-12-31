import { Component } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';
import { ModalBase } from 'src/app/shared/ui/modal/modal.base';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
})
export class ProductPreviewComponent extends ModalBase<ProductDto> {
  private _product: ProductDto;

  constructor() {
    super();

    this.subject$.subscribe((data: ProductDto) => (this._product = data));
  }

  get product(): ProductDto {
    return this._product;
  }

  nextConfirm() {
    return true;
  }
  nextReject() {
    return true;
  }
}
