export interface ToastOptions {
  type: 'success' | 'error' | 'info' | 'warn';
  description: string;
  positionX?: 'center' | 'left' | 'right';
  positionY?: 'top' | 'bottom';
  autoHide?: boolean;
  visibilityTime?: number;
}

export interface Toast extends ToastOptions {
  visible: boolean;
}
