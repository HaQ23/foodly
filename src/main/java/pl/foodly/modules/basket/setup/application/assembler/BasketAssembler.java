package pl.foodly.modules.basket.setup.application.assembler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.foodly.modules.basket.setup.application.web.dto.BasketItemDto;
import pl.foodly.modules.basket.setup.domain.entity.BasketItem;

@Component
@RequiredArgsConstructor
public class BasketAssembler {

    public BasketItemDto map(BasketItem basketItem){
        return BasketItemDto.builder()
                .quantity(basketItem.getQuantity())
                .product_id(basketItem.getProduct().getId())
                .build();
    }
    public BasketItem update(BasketItemDto basketItemDto,BasketItem basketItem){
        basketItem.setQuantity(basketItemDto.getQuantity());
            return basketItem;
    }

}
