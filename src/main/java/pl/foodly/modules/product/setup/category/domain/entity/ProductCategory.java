package pl.foodly.modules.product.setup.category.domain.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "s_product_category")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}
