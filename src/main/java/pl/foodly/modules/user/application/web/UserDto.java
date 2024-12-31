package pl.foodly.modules.user.application.web;

import lombok.*;
import pl.foodly.modules.restaurant.setup.restaurant.application.web.dto.RestaurantDto;
import pl.foodly.modules.user.domain.entity.Role;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String username;
    private String firstName;
    private String lastName;
    private Role role;
}
