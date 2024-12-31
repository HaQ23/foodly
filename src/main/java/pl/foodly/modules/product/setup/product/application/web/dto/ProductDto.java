package pl.foodly.modules.product.setup.product.application.web.dto;

import lombok.*;
import pl.foodly.modules.product.setup.category.application.web.dto.ProductCategoryDto;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String price;
    private String photo;
    private Long restaurantId;
    private Set<ProductCategoryDto> categories;
}
