package pl.foodly.modules.basket.setup.application.web.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BasketItemAddDto {
    private String product;
    private long quantity;
}
