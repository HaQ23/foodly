package pl.foodly.modules.basket.setup.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import pl.foodly.modules.user.domain.entity.User;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "p_basket")
public class Basket {
    @Id
    @GeneratedValue(generator = "basket_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "basket_id_seq", sequenceName = "basket_id_seq", allocationSize = 1)
    private long id;
    private String uuid;
    @OneToOne
    @JoinColumn(name = "username")
    private User user;
}
