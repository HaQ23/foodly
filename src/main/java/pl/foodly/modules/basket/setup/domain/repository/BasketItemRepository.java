package pl.foodly.modules.basket.setup.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.foodly.modules.basket.setup.domain.entity.Basket;
import pl.foodly.modules.basket.setup.domain.entity.BasketItem;
import pl.foodly.modules.product.setup.product.domain.entity.Product;


import java.util.List;
import java.util.Optional;

public interface BasketItemRepository extends JpaRepository<BasketItem,Long> {
    Optional<BasketItem> findByBasketAndProduct(Basket basket, Product product);
    @Query(nativeQuery = true ,value = "SELECT SUM(quantity) from s_basket_item where basket_id = ?1")
    Long sumBasketItems(long basket);
    Optional<BasketItem> findBasketItemsByProductAndBasket(Long id,Basket basket);
    List<BasketItem> findBasketItemsByBasket(Basket basket);
}
