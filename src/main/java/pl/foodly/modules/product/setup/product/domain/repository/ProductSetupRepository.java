package pl.foodly.modules.product.setup.product.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;
import pl.foodly.modules.product.setup.product.domain.entity.Product;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface ProductSetupRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByCategories(ProductCategory productCategory);
    List<Product> findByRestaurantId(Long id);
}
