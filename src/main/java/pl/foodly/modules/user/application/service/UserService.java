package pl.foodly.modules.user.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.restaurant.setup.restaurant.domain.entity.Restaurant;
import pl.foodly.modules.restaurant.setup.restaurant.domain.repository.RestaurantSetupRepository;
import pl.foodly.modules.user.application.assembler.UserAssembler;
import pl.foodly.modules.user.application.web.UserDto;
import pl.foodly.modules.user.domain.entity.User;
import pl.foodly.modules.user.domain.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserAssembler userAssembler;
    private final RestaurantSetupRepository restaurantSetupRepository;

    public List<UserDto> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userAssembler::map)
                .collect(Collectors.toList());
    }

    public UserDto getUser(String username) {
        return userRepository.findById(username)
                .map(userAssembler::map)
                .orElse(null);
    }

    @Transactional
    public UserDto updateUser(String username, UserDto userDto) {
        User user = userRepository.findById(username).orElse(null);

        if(ObjectUtils.isEmpty(user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        userAssembler.update(userDto, user);
        userRepository.save(user);

        return userAssembler.map(user);
    }

    public void deleteUser(String username) {
        User user = userRepository.findById(username).orElse(null);

        if(ObjectUtils.isEmpty(user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        List<Restaurant> restaurants = restaurantSetupRepository.findAllByOwnerUsername(username);

        if(!ObjectUtils.isEmpty(restaurants)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is owner of restaurant and can't be removed.");
        }
        userRepository.deleteById(username);
    }
}