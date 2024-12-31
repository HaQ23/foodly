package pl.foodly.modules.restaurant.setup.category.application.web.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantCategoryDto {

    private String code;
    private String name;
    private String icon;
}
