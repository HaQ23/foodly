package pl.foodly.modules.restaurant.setup.category.application.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.restaurant.setup.category.application.service.RestaurantCategorySetupService;
import pl.foodly.modules.restaurant.setup.category.application.web.dto.RestaurantCategoryDto;

import java.util.List;

@RestController
@RequestMapping("/api/setup/restaurant/category")
@AllArgsConstructor
public class RestaurantCategorySetupController {

    private final RestaurantCategorySetupService restaurantCategorySetupService;
    @GetMapping
    public List<RestaurantCategoryDto> getAllRestaurantCategories() {
        return restaurantCategorySetupService.getAllRestaurantsCategories();
    }

    @GetMapping("/{id}")
    public RestaurantCategoryDto getRestaurantCategory(@PathVariable String id) {
        return restaurantCategorySetupService.getRestaurantCategory(id);
    }

    @PostMapping
    public RestaurantCategoryDto createRestaurantCategory(@RequestBody RestaurantCategoryDto restaurantCategoryDto) {
        return restaurantCategorySetupService.createRestaurantCategory(restaurantCategoryDto);
    }

    @PutMapping("/{id}")
    public RestaurantCategoryDto updateRestaurantCategory(@RequestBody RestaurantCategoryDto restaurantCategoryDto, @PathVariable String id){
        return restaurantCategorySetupService.updateRestaurantCategory(restaurantCategoryDto, id);
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurantCategory(@PathVariable String id) {
       restaurantCategorySetupService.deleteRestaurantCategory(id);
    }
}
