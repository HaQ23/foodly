package pl.foodly.modules.restaurant.setup.category.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.restaurant.setup.category.application.assembler.RestaurantCategorySetupAssembler;
import pl.foodly.modules.restaurant.setup.category.application.web.dto.RestaurantCategoryDto;
import pl.foodly.modules.restaurant.setup.category.domain.entity.RestaurantCategory;
import pl.foodly.modules.restaurant.setup.category.domain.repository.RestaurantCategorySetupRepository;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;
import pl.foodly.modules.restaurant.setup.restaurant.domain.repository.RestaurantSetupRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantCategorySetupService {

    private final RestaurantCategorySetupRepository restaurantCategorySetupRepository;
    private final RestaurantCategorySetupAssembler restaurantCategorySetupAssembler;
    private final RestaurantSetupRepository restaurantSetupRepository;

    public List<RestaurantCategoryDto> getAllRestaurantsCategories() {
        return restaurantCategorySetupRepository.findAll()
                .stream()
                .map(restaurantCategorySetupAssembler::map).collect(Collectors.toList());
    }

    public RestaurantCategoryDto getRestaurantCategory(String id) {
        return restaurantCategorySetupRepository.findById(id)
                .map(restaurantCategorySetupAssembler::map)
                .orElse(null);
    }

    public RestaurantCategoryDto createRestaurantCategory(RestaurantCategoryDto restaurantCategoryDto) {
        RestaurantCategory restaurantCategory = restaurantCategorySetupRepository.findByName(restaurantCategoryDto.getName());

        if(!ObjectUtils.isEmpty(restaurantCategory)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        restaurantCategory = new RestaurantCategory();
        restaurantCategorySetupAssembler.update(restaurantCategoryDto, restaurantCategory);
        restaurantCategory.setCode(generateUniqueCode());
        restaurantCategorySetupRepository.save(restaurantCategory);
        return restaurantCategorySetupAssembler.map(restaurantCategory);
    }

    @Transactional
    public RestaurantCategoryDto updateRestaurantCategory(RestaurantCategoryDto restaurantCategoryDto, String id) {
        RestaurantCategory restaurantCategory = restaurantCategorySetupRepository.findById(id).orElse(null);

        if(ObjectUtils.isEmpty(restaurantCategory)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        restaurantCategorySetupAssembler.update(restaurantCategoryDto, restaurantCategory);
        restaurantCategorySetupRepository.save(restaurantCategory);
        return restaurantCategorySetupAssembler.map(restaurantCategory);
    }

    public void deleteRestaurantCategory(String id) {
        RestaurantCategory restaurantCategory = restaurantCategorySetupRepository.findById(id).orElse(null);

        if(ObjectUtils.isEmpty(restaurantCategory)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Restaurant restaurantInCategory = restaurantSetupRepository.findByCategories(restaurantCategory).orElse(null);

        if(!ObjectUtils.isEmpty(restaurantInCategory)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can't remove this category because it has restaurants in it.");
        }
        restaurantCategorySetupRepository.deleteById(id);
    }

    private String generateUniqueCode() {
        return UUID.randomUUID().toString().substring(0, 18);
    }


}
