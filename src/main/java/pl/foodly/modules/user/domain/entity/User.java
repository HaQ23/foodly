package pl.foodly.modules.user.domain.entity;

import lombok.Getter;
import lombok.Setter;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;
import pl.foodly.shared.base.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "p_user")
public class User extends BaseEntity {

    @Id
    private String username;

    private String password;

    private String firstName;

    private String lastName;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private Set<Restaurant> restaurants;

}
