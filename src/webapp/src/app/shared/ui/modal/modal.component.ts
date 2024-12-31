import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md'; // Rozmiar modalu
  @Input() title: string = ''; // Tytuł modalu
  @Input() showButtons: boolean = true; // Czy przyciski są widoczne (potwierdzenie/odrzucenie)
  @Input() isVisible: boolean = true; // Czy modal jest widoczny
  @Input() modalType: boolean = true; // Typ modalu (true - confirm, false - danger)
  showOverlay: boolean = true;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // Jeśli istnieje więcej niż jeden modal, wyłączamy overlay dla następnych
    this.modalService.getModalInstancesAmount() > 1
      ? (this.showOverlay = false)
      : (this.showOverlay = true);
  }

  // Metody związane z działaniem modalu
  confirm(): void {
    this.modalService.confirm();
  }

  reject(): void {
    this.modalService.reject();
  }

  close(): void {
    this.modalService.close();
  }
}
