package pl.foodly.modules.product.setup.product.application.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.product.setup.category.application.web.dto.ProductCategoryDto;
import pl.foodly.modules.product.setup.product.application.service.ProductSetupService;
import pl.foodly.modules.product.setup.product.application.web.dto.ProductDto;

import java.util.List;

@RestController
@RequestMapping("/api/setup/product")
@AllArgsConstructor
public class ProductSetupController {
    private final ProductSetupService productSetupService;
    @GetMapping
    public List<ProductDto> getAllProducts(){
        return productSetupService.getAllProducts();
    }
    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id){
        return productSetupService.getProduct(id);
    }

    @GetMapping("/restaurant/{id}")
    public List<ProductDto> getAllProductByRestaurant(@PathVariable Long id) {
        return productSetupService.getAllProductByRestaurant(id);
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productSetupService.deleteProduct(id);
    }
    @PutMapping("/{id}")
    public  ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto){
        return productSetupService.update(productDto, id);
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto){
        return  productSetupService.createProduct(productDto);
    }
}



