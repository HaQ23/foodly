package pl.foodly.modules.product.setup.product.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "s_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String price;

    private String photo;

    @ManyToMany
    @JoinTable(
            name = "p_product_category_association",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ProductCategory> categories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}
