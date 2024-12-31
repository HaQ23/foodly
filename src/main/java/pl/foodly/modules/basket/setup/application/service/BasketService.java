package pl.foodly.modules.basket.setup.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.foodly.modules.basket.setup.application.exceptions.BasketItemDontExistException;
import pl.foodly.modules.basket.setup.application.exceptions.NoBasketInfoException;
import pl.foodly.modules.basket.setup.application.web.dto.BasketItemDto;
import pl.foodly.modules.basket.setup.application.web.dto.ListBasketItemDTO;
import pl.foodly.modules.basket.setup.domain.entity.Basket;
import pl.foodly.modules.basket.setup.domain.entity.BasketItem;
import pl.foodly.modules.basket.setup.domain.entity.Response;
import pl.foodly.modules.basket.setup.domain.repository.BasketItemRepository;
import pl.foodly.modules.basket.setup.domain.repository.BasketRepository;
import pl.foodly.modules.product.setup.product.application.service.ProductSetupService;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.product.setup.product.domain.repository.ProductSetupRepository;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketItemRepository basketItemRepository;
    private final BasketRepository basketRepository;
    private final CookieService cookieService;
    private final ProductSetupRepository productSetupRepository;
    public ResponseEntity<?> add(BasketItemDto basketItemDto, HttpServletRequest request, HttpServletResponse response) {
        HttpHeaders httpHeaders = new HttpHeaders();
        List<Cookie> cookies = new ArrayList<>();
        if (request.getCookies() != null) {
            cookies.addAll(List.of(request.getCookies()));
        }
        cookies.stream().filter(value -> value.getName().equals("basket"))
                .findFirst().ifPresentOrElse(value -> {
                    basketRepository.findByUuid(value.getValue()).ifPresentOrElse(basket -> {
                        addProductToBasket(basket, basketItemDto);
                        Long sum = basketItemRepository.sumBasketItems(basket.getId());
                        if (sum == null) sum = 0L;
                        httpHeaders.add("X-Total-Count", String.valueOf(sum));
                    }, () -> {
                        Basket basket = createBasket();
                        response.addCookie(cookieService.generateCookie("basket", basket.getUuid()));
                        addProductToBasket(basket, basketItemDto);
                        Long sum = basketItemRepository.sumBasketItems(basket.getId());
                        if (sum == null) sum = 0L;
                        httpHeaders.add("X-Total-Count", String.valueOf(sum));
                    });
                }, () -> {
                    Basket basket = createBasket();
                    response.addCookie(cookieService.generateCookie("basket", basket.getUuid()));
                    addProductToBasket(basket, basketItemDto);
                    Long sum = basketItemRepository.sumBasketItems(basket.getId());
                    if (sum == null) sum = 0L;
                    httpHeaders.add("X-Total-Count", String.valueOf(sum));
                });
        return ResponseEntity.ok().headers(httpHeaders).body(new Response("Successful add item to basket"));
    }
    private Basket createBasket() {
        Basket basket = new Basket();
        basket.setUuid(UUID.randomUUID().toString());
        return basketRepository.saveAndFlush(basket);
    }
    private void addProductToBasket(Basket basket, BasketItemDto basketItemDto) {
        BasketItem basketItem = new BasketItem();
            Optional <Product> optionalProduct = productSetupRepository.findById(basketItemDto.getProduct_id());
            optionalProduct.ifPresent(product -> {
                basketItemRepository.findByBasketAndProduct(basket, product).ifPresentOrElse(basketItems1 -> {
                    basketItems1.setQuantity(basketItems1.getQuantity() + basketItemDto.getQuantity());
                    basketItemRepository.save(basketItems1);
                }, () -> {
                    basketItem.setBasket(basket);
                    basketItem.setQuantity(basketItemDto.getQuantity());
                    basketItem.setProduct(product);
                    basketItemRepository.save(basketItem);
                });
            });

    }
    private void deleteItem(Long id,Basket basket) throws BasketItemDontExistException {
        basketItemRepository.findBasketItemsByProductAndBasket(id,basket).ifPresentOrElse(basketItemRepository::delete,()->{
            throw new BasketItemDontExistException("Basket item dont exist");
        });
        Long sum = basketItemRepository.sumBasketItems(basket.getId());
        if (sum==null || sum == 0) basketRepository.delete(basket);
    }


    public ResponseEntity<?> getItems(HttpServletRequest request) {
        List<Cookie> cookies = new ArrayList<>();
        HttpHeaders httpHeaders = new HttpHeaders();
        if (request.getCookies() != null) {
            cookies.addAll(List.of(request.getCookies()));
        }
        ListBasketItemDTO listBasketItemDTO = new ListBasketItemDTO();
        listBasketItemDTO.setBasketProducts(new ArrayList<>());
        cookies.stream()
                .filter(value -> value.getName().equals("basket"))
                .findFirst()
                .ifPresentOrElse(value -> {
                    Basket basket = basketRepository.findByUuid(value.getValue())
                            .orElseThrow(NoBasketInfoException::new);
                    Long sum = basketItemRepository.sumBasketItems(basket.getId());
                    if (sum == null) sum = 0L;
                    httpHeaders.add("X-Total-Count", String.valueOf(sum));

                    basketItemRepository.findBasketItemsByBasket(basket).forEach(item -> {
                        Optional<Product> optionalProduct = productSetupRepository.findById(item.getProduct().getId());
                        optionalProduct.ifPresent(product -> {
                            Double itemPrice = Double.parseDouble(product.getPrice()) * item.getQuantity();
                            listBasketItemDTO.getBasketProducts().add(new BasketItemDto(
                                   item.getId(),
                                    product.getId(),
                                    item.getQuantity(),
                                    product.getPrice(),
                                    itemPrice
                            ));
                            listBasketItemDTO.setSummaryPrice(listBasketItemDTO.getSummaryPrice() + itemPrice);
                        });
                    });
                }, () -> {
                    throw new NoBasketInfoException("No basket info in request");
                });

        if (httpHeaders.isEmpty()) httpHeaders.add("X-Total-Count", String.valueOf(0));
        return ResponseEntity.ok().headers(httpHeaders).body(listBasketItemDTO);
    }
}
