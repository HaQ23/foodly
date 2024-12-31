package pl.foodly.modules.user.application.assembler;

import org.springframework.stereotype.Component;
import pl.foodly.modules.user.application.web.RoleDto;
import pl.foodly.modules.user.domain.entity.Role;

@Component
public class RoleAssembler {


    public RoleDto map(Role role) {
        return RoleDto.builder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }
}
