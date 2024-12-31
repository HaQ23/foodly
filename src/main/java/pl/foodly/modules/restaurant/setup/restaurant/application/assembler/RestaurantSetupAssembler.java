package pl.foodly.modules.restaurant.setup.restaurant.application.assembler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.foodly.modules.restaurant.setup.category.application.assembler.RestaurantCategorySetupAssembler;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor

public class RestaurantSetupAssembler {
    private final RestaurantCategorySetupAssembler restaurantCategorySetupAssembler;
    public RestaurantDto map(Restaurant restaurant) {
        return RestaurantDto.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .city(restaurant.getCity())
                .street(restaurant.getStreet())
                .buildingNumber(restaurant.getBuildingNumber())
                .postCode(restaurant.getPostCode())
                .province(restaurant.getProvince())
                .photo(restaurant.getPhoto())
                .categories(restaurant.getCategories() != null ? restaurant.getCategories()
                        .stream()
                        .map(restaurantCategorySetupAssembler::map)
                        .collect(Collectors.toList()) : null)
                .build();
    }
    public Restaurant update(RestaurantDto restaurantDto, Restaurant restaurant) {
        restaurant.setName(restaurantDto.getName());
        restaurant.setCity(restaurantDto.getCity());
        restaurant.setStreet(restaurantDto.getStreet());
        restaurant.setBuildingNumber(restaurantDto.getBuildingNumber());
        restaurant.setPostCode(restaurantDto.getPostCode());
        restaurant.setProvince(restaurantDto.getProvince());
        restaurant.setPhoto(restaurantDto.getPhoto());
        restaurant.setCategories(restaurantCategorySetupAssembler.mapCategoryListDtoToCategoryList(restaurantDto.getCategories()));
        return restaurant;
    }


}
