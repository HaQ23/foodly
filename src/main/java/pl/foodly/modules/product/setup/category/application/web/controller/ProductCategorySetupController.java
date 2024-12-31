package pl.foodly.modules.product.setup.category.application.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.product.setup.category.application.service.ProductCategorySetupService;
import pl.foodly.modules.product.setup.category.application.web.dto.ProductCategoryDto;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/setup/product/category")
public class ProductCategorySetupController {
    private final ProductCategorySetupService productCategorySetupService;

    @GetMapping
    public List<ProductCategoryDto> getAllProductCategory() {
        return productCategorySetupService.getAllProductCategories();
    }

    @GetMapping("/{id}")
    public ProductCategoryDto getProductCategory(@PathVariable Long id) {
        return productCategorySetupService.getProductCategory(id);
    }

    @GetMapping("/restaurant/{id}")
    public List<ProductCategoryDto> getAllProductCategoryByRestaurant(@PathVariable Long id) {
        return productCategorySetupService.getAllProductCategoriesByRestaurant(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProductCategory(@PathVariable Long id) {
        productCategorySetupService.deleteProductCategory(id);
    }

    @PostMapping
    public ProductCategoryDto createProductCategory(@RequestBody ProductCategoryDto productCategoryDto) {
        return productCategorySetupService.createProductCategory(productCategoryDto);
    }

    @PutMapping("/{id}")
    public ProductCategoryDto updateProductCategory(@RequestBody ProductCategoryDto productCategoryDto, @PathVariable Long id) {
        return productCategorySetupService.updateProductCategory(productCategoryDto, id);
    }
}
