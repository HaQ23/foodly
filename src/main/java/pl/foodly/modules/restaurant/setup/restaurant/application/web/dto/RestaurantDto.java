package pl.foodly.modules.restaurant.setup.restaurant.application.web.dto;

import lombok.*;
import pl.foodly.modules.restaurant.setup.category.application.web.dto.RestaurantCategoryDto;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {

    private Long id;
    private String name;
    private String city;
    private String street;
    private String buildingNumber;
    private String postCode;
    private String province;
    private String photo;
    private List<RestaurantCategoryDto> categories;
//    private User owner;
    //TODO

}
