package pl.foodly.modules.basket.setup.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.basket.setup.domain.entity.Basket;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket,Long> {
    Optional<Basket> findByUuid(String uuid);
}
