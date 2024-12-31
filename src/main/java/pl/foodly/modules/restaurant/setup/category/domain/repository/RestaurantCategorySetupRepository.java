package pl.foodly.modules.restaurant.setup.category.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.restaurant.setup.category.domain.entity.RestaurantCategory;

public interface RestaurantCategorySetupRepository extends JpaRepository<RestaurantCategory, String> {

    RestaurantCategory findByName(String name);
}
