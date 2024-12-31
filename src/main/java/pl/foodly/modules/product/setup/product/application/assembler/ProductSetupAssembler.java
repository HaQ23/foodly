package pl.foodly.modules.product.setup.product.application.assembler;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;
import pl.foodly.modules.product.setup.category.application.assembler.ProductCategorySetupAssembler;
import pl.foodly.modules.product.setup.product.application.web.dto.ProductDto;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.restaurant.setup.restaurant.application.assembler.RestaurantSetupAssembler;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;
import pl.foodly.modules.restaurant.setup.restaurant.domain.repository.RestaurantSetupRepository;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductSetupAssembler {
    private final RestaurantSetupAssembler restaurantSetupAssembler;
    private final RestaurantSetupRepository restaurantSetupRepository;
    private final ProductCategorySetupAssembler productCategorySetupAssembler;

    public ProductDto map(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .photo(product.getPhoto())
                .price(product.getPrice())
                .description(product.getDescription())
                .name(product.getName())
                .restaurantId(product.getRestaurant() != null ? product.getRestaurant().getId() : null)
                .categories(product.getCategories() != null ? product.getCategories()
                        .stream()
                        .map(productCategorySetupAssembler::map)
                        .collect(Collectors.toSet()) : null)
                .build();
    }

    public Product update(ProductDto productDto, Product product) {
        product.setName(productDto.getName());
        product.setPhoto(productDto.getPhoto());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setRestaurant(restaurantSetupRepository.findById(productDto.getRestaurantId()).orElse(null));
        product.setCategories(ObjectUtils.isNotEmpty(productDto.getCategories()) ? productCategorySetupAssembler.mapProductCategorySetDtoToProductCategorySet(productDto.getCategories()) : null);
        return product;
    }

}
