package pl.foodly.modules.product.setup.category.application.assembler;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;
import pl.foodly.modules.product.setup.category.application.web.dto.ProductCategoryDto;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;
import pl.foodly.modules.product.setup.category.domain.repository.ProductCategorySetupRepository;
import pl.foodly.modules.restaurant.setup.restaurant.domain.repository.RestaurantSetupRepository;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class ProductCategorySetupAssembler {
    private final ProductCategorySetupRepository productCategorySetupRepository;
    private final RestaurantSetupRepository restaurantSetupRepository;

    public ProductCategoryDto map(ProductCategory productCategory) {
        return ProductCategoryDto.builder()
                .id(productCategory.getId())
                .name(productCategory.getName())
                .restaurantId(productCategory.getRestaurant().getId()).build();
    }

    public ProductCategory update(ProductCategoryDto productCategoryDto, ProductCategory productCategory) {
        productCategory.setName(productCategoryDto.getName() != null ? productCategoryDto.getName() : productCategory.getName());
        productCategory.setRestaurant(restaurantSetupRepository.findById(productCategoryDto.getRestaurantId()).orElse(null));
        return productCategory;
    }

    public Set<ProductCategory> mapProductCategorySetDtoToProductCategorySet(Set<ProductCategoryDto> productCategoryDtoSet) {
        Set<ProductCategory> productCategories = new HashSet<ProductCategory>();
        for (ProductCategoryDto productCategoryDto : productCategoryDtoSet) {
            ProductCategory productCategory = productCategorySetupRepository.findById(productCategoryDto.getId()).orElse(null);
            if (!ObjectUtils.isEmpty(productCategory)) {
                productCategories.add(productCategory);
            }
        }
        return productCategories;
    }
}
