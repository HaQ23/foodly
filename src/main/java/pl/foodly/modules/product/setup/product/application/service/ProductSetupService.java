package pl.foodly.modules.product.setup.product.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.product.setup.product.application.assembler.ProductSetupAssembler;
import pl.foodly.modules.product.setup.product.application.web.dto.ProductDto;
import pl.foodly.modules.product.setup.product.domain.entity.Product;
import pl.foodly.modules.product.setup.product.domain.repository.ProductSetupRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductSetupService {
    private final ProductSetupAssembler productSetupAssembler;
    private final ProductSetupRepository productSetupRepository;
    public List<ProductDto> getAllProducts(){
        return productSetupRepository.findAll()
                .stream()
                .map(productSetupAssembler::map)
                .collect(Collectors.toList());
    }
    public List<ProductDto> getAllProductByRestaurant(Long id) {
        return productSetupRepository.findByRestaurantId(id)
                .stream()
                .map(productSetupAssembler::map)
                .collect(Collectors.toList());
    }
    public ProductDto getProduct(Long id){
        return productSetupRepository.findById(id)
                .map(productSetupAssembler::map)
                .orElse(null);
    }
    public ProductDto createProduct(ProductDto productDto){
        Product product = new Product();
        productSetupAssembler.update(productDto,product);
        productSetupRepository.save(product);
        return productSetupAssembler.map(product);
    }
    public void deleteProduct(Long id){
        Product product  = productSetupRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(product)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        productSetupRepository.deleteById(id);
    }
    @Transactional
    public ProductDto update(ProductDto productDto,Long id){
        Product product = productSetupRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(product)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        productSetupAssembler.update(productDto,product);
        productSetupRepository.save(product);
        return productSetupAssembler.map(product);
    }
}
