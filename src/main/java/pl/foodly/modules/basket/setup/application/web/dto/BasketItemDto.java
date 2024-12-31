package pl.foodly.modules.basket.setup.application.web.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BasketItemDto {
    private Long id;
    private Long product_id;
    private int quantity;
    private String price;
    private double summaryPrice;
}
