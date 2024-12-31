package pl.foodly.modules.basket.setup.application.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ListBasketItemDTO {
    private List<BasketItemDto> basketProducts;
    private double summaryPrice;
}
