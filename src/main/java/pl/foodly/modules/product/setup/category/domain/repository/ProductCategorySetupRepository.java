package pl.foodly.modules.product.setup.category.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;

import java.util.List;

public interface ProductCategorySetupRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findAllByRestaurantId(Long id);
}
