package pl.foodly.modules.basket.setup.domain.entity;

import lombok.*;
import pl.foodly.modules.product.setup.product.domain.entity.Product;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "s_basket_item")
public class BasketItem {
    @Id
    @GeneratedValue(generator = "basket_items_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "basket_items_id_seq", sequenceName = "basket_items_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "basket_id")
    private Basket basket;

    private int quantity;
}
