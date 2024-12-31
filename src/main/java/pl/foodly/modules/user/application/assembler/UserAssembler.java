package pl.foodly.modules.user.application.assembler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import pl.foodly.modules.restaurant.setup.restaurant.application.assembler.RestaurantSetupAssembler;
import pl.foodly.modules.user.application.web.UserDto;
import pl.foodly.modules.user.domain.entity.Role;
import pl.foodly.modules.user.domain.entity.User;
import pl.foodly.modules.user.domain.repository.RoleRepository;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserAssembler {
    private final RoleRepository roleRepository;

    public UserDto map(User user) {
        return UserDto.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }

    public User update(UserDto userDto, User user) {
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        if (!ObjectUtils.isEmpty(userDto.getRole())) {
            updateRole(userDto, user);
        }
        return user;
    }

    public void updateRole(UserDto userDto, User user) {
        Role role = roleRepository.findById(userDto.getRole().getId()).orElse(null);
        user.setRole(role);
    }
}
