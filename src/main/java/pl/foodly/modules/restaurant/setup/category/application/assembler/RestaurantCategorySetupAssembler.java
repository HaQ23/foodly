package pl.foodly.modules.restaurant.setup.category.application.assembler;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;
import pl.foodly.modules.restaurant.setup.category.application.web.dto.RestaurantCategoryDto;
import pl.foodly.modules.restaurant.setup.category.domain.entity.RestaurantCategory;
import pl.foodly.modules.restaurant.setup.category.domain.repository.RestaurantCategorySetupRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class RestaurantCategorySetupAssembler {

    private final RestaurantCategorySetupRepository restaurantCategorySetupRepository;

    public RestaurantCategoryDto map(RestaurantCategory restaurantCategory) {
        return RestaurantCategoryDto.builder()
                .code(restaurantCategory.getCode())
                .name(restaurantCategory.getName())
                .icon(restaurantCategory.getIcon())
                .build();
    }

    public RestaurantCategory update(RestaurantCategoryDto restaurantCategoryDto, RestaurantCategory restaurantCategory) {
        restaurantCategory.setName(restaurantCategoryDto.getName() != null ? restaurantCategoryDto.getName() : restaurantCategory.getName());
        restaurantCategory.setIcon(restaurantCategoryDto.getIcon() != null ? restaurantCategoryDto.getIcon() : restaurantCategory.getIcon());
        return restaurantCategory;
    }

    public List<RestaurantCategory> mapCategoryListDtoToCategoryList(List<RestaurantCategoryDto> restaurantCategoryDtos) {
        List<RestaurantCategory> restaurantCategories = new ArrayList<>();

        for (RestaurantCategoryDto restaurantCategoryDto : restaurantCategoryDtos) {
            RestaurantCategory restaurantCategory = restaurantCategorySetupRepository.findById(restaurantCategoryDto.getCode()).orElse(null);
            if(!ObjectUtils.isEmpty(restaurantCategory)) {
                restaurantCategories.add(restaurantCategory);
            }
        }

        return restaurantCategories;
    }

}
