package pl.foodly.modules.restaurant.setup.restaurant.application.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.restaurant.setup.restaurant.application.service.RestaurantSetupService;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;

import java.util.List;

@RestController
@RequestMapping("/api/setup/restaurant")
@AllArgsConstructor
public class RestaurantSetupController {

    private final RestaurantSetupService restaurantSetupService;

    @GetMapping
    public List<RestaurantDto> getAllRestaurants() {
        return restaurantSetupService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public RestaurantDto getRestaurant(@PathVariable Long id) {
        return restaurantSetupService.getRestaurant(id);
    }

    @PostMapping
    public RestaurantDto createRestaurant(@RequestBody RestaurantDto restaurantDto) {
        return restaurantSetupService.createRestaurant(restaurantDto);
    }

    @PutMapping("/{id}")
    public RestaurantDto updateRestaurant(@PathVariable Long id, @RequestBody RestaurantDto restaurantDto) {
        return restaurantSetupService.updateRestaurant(restaurantDto, id);
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        restaurantSetupService.deleteRestaurant(id);
    }
}
