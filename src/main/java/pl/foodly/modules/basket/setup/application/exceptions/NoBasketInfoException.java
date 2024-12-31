package pl.foodly.modules.basket.setup.application.exceptions;

public class NoBasketInfoException  extends RuntimeException{
    public NoBasketInfoException() {
        super();
    }

    public NoBasketInfoException(String message) {
        super(message);
    }

    public NoBasketInfoException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoBasketInfoException(Throwable cause) {
        super(cause);
    }
}
