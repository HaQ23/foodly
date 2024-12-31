package pl.foodly.modules.basket.setup.application.web.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.basket.setup.application.service.BasketService;
import pl.foodly.modules.basket.setup.application.web.dto.BasketItemDto;
import pl.foodly.modules.basket.setup.domain.entity.Basket;
import pl.foodly.modules.basket.setup.domain.repository.BasketRepository;
import pl.foodly.modules.product.setup.product.application.web.dto.ProductDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/basket")
@AllArgsConstructor
public class BasketController {
    private final BasketService basketService;
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addProduct(@RequestBody BasketItemDto basketItemAddDTO, HttpServletRequest request, HttpServletResponse response){
        return basketService.add(basketItemAddDTO,request,response);
    }
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getItems(HttpServletRequest request){
        return basketService.getItems(request);
    }
}
