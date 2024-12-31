package pl.foodly.modules.product.setup.category.application.web.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryDto {
    private Long id;
    private String name;
    private Long restaurantId;
}
