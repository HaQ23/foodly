package pl.foodly.modules.restaurant.setup.category.domain.entity;


import lombok.Getter;
import lombok.Setter;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "s_restaurant_category")
public class RestaurantCategory {

    @Id
    private String code;

    private String name;

    private String icon;


}
