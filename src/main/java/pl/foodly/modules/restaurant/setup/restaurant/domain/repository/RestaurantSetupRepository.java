package pl.foodly.modules.restaurant.setup.restaurant.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.restaurant.setup.category.domain.entity.RestaurantCategory;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;

import java.util.List;
import java.util.Optional;

public interface RestaurantSetupRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByCategories(RestaurantCategory restaurantCategory);

    List<Restaurant> findAllByOwnerUsername(String username);
}
