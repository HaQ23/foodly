package pl.foodly.modules.restaurant.setup.restaurant.domain.entity;

import lombok.Getter;
import lombok.Setter;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.restaurant.setup.category.domain.entity.RestaurantCategory;
import pl.foodly.modules.user.domain.entity.User;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "s_restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String city;

    private String street;

    private String buildingNumber;

    private String postCode;

    private String province;

    private String photo;

    @ManyToMany
    @JoinTable(
            name = "p_restaurant_category_association",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<RestaurantCategory> categories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private Set<Product> products;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<ProductCategory> productCategories;
}
