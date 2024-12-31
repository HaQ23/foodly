package pl.foodly.modules.product.setup.category.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.product.setup.category.application.assembler.ProductCategorySetupAssembler;
import pl.foodly.modules.product.setup.category.application.web.dto.ProductCategoryDto;
import pl.foodly.modules.product.setup.category.domain.entity.ProductCategory;
import pl.foodly.modules.product.setup.category.domain.repository.ProductCategorySetupRepository;
import pl.foodly.modules.product.setup.product.application.service.ProductSetupService;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.product.setup.product.domain.repository.ProductSetupRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductCategorySetupService {
    private final ProductCategorySetupRepository productCategorySetupRepository;
    private final ProductCategorySetupAssembler productCategorySetupAssembler;
    private final ProductSetupRepository productSetupRepository;

    public List<ProductCategoryDto> getAllProductCategories() {
        return productCategorySetupRepository.findAll()
                .stream()
                .map(productCategorySetupAssembler::map)
                .collect(Collectors.toList());
    }

    public List<ProductCategoryDto> getAllProductCategoriesByRestaurant(Long id) {
        return productCategorySetupRepository.findAllByRestaurantId(id)
                .stream()
                .map(productCategorySetupAssembler::map)
                .collect(Collectors.toList());
    }

    public ProductCategoryDto getProductCategory(Long id) {
        return productCategorySetupRepository.findById(id).map(productCategorySetupAssembler::map).orElse(null);
    }

    public ProductCategoryDto createProductCategory(ProductCategoryDto productCategoryDto) {
        ProductCategory productCategory = new ProductCategory();
        productCategorySetupAssembler.update(productCategoryDto, productCategory);
        productCategorySetupRepository.save(productCategory);
        return productCategorySetupAssembler.map(productCategory);
    }

    public void deleteProductCategory(Long id) {
        ProductCategory productCategory = productCategorySetupRepository.findById(id).orElse(null);
        if (ObjectUtils.isEmpty(productCategory)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Product productInCategory = productSetupRepository.findByCategories(productCategory).orElse(null);
        if(!ObjectUtils.isEmpty(productInCategory)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can't remove this product category because it has products.");
        }
        productCategorySetupRepository.deleteById(id);
    }

    @Transactional
    public ProductCategoryDto updateProductCategory(ProductCategoryDto productCategoryDto, Long id) {
        ProductCategory productCategory = productCategorySetupRepository.findById(id).orElse(null);
        if (ObjectUtils.isEmpty(productCategory)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        productCategorySetupAssembler.update(productCategoryDto, productCategory);
        productCategorySetupRepository.save(productCategory);
        return productCategorySetupAssembler.map(productCategory);
    }
}
