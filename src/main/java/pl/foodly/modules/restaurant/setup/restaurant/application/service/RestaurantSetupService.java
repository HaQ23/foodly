package pl.foodly.modules.restaurant.setup.restaurant.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.restaurant.setup.restaurant.application.assembler.RestaurantSetupAssembler;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;
import pl.foodly.modules.restaurant.setup.restaurant.domain.repository.RestaurantSetupRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantSetupService {

    private final RestaurantSetupRepository restaurantSetupRepository;
    private final RestaurantSetupAssembler restaurantSetupAssembler;

    public List<RestaurantDto> getAllRestaurants() {
        return restaurantSetupRepository.findAll()
                .stream()
                .map(restaurantSetupAssembler::map).collect(Collectors.toList());
    }

    public RestaurantDto getRestaurant(Long id) {
        Restaurant restaurant = restaurantSetupRepository.findById(id)
                .orElse(null);

        if (ObjectUtils.isEmpty(restaurant)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return restaurantSetupAssembler.map(restaurant);
    }

    public RestaurantDto createRestaurant(RestaurantDto restaurantDto) {
        Restaurant restaurant = new Restaurant();
        restaurantSetupAssembler.update(restaurantDto, restaurant);
        restaurantSetupRepository.save(restaurant);
        return restaurantSetupAssembler.map(restaurant);
    }

    @Transactional
    public RestaurantDto updateRestaurant(RestaurantDto restaurantDto, Long id) {
        Restaurant restaurant = restaurantSetupRepository.findById(id).orElse(null);

        if (ObjectUtils.isEmpty(restaurant)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        restaurantSetupAssembler.update(restaurantDto, restaurant);
        restaurantSetupRepository.save(restaurant);
        return restaurantSetupAssembler.map(restaurant);
    }

    public void deleteRestaurant(Long id) {
        Restaurant restaurant = restaurantSetupRepository.findById(id).orElse(null);

        if (ObjectUtils.isEmpty(restaurant)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        restaurantSetupRepository.deleteById(id);
    }
}
