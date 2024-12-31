package pl.foodly.modules.user.application.service;


import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.foodly.modules.user.application.assembler.RoleAssembler;
import pl.foodly.modules.user.application.web.RoleDto;
import pl.foodly.modules.user.domain.entity.Role;
import pl.foodly.modules.user.domain.entity.User;
import pl.foodly.modules.user.domain.repository.RoleRepository;
import pl.foodly.modules.user.domain.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleAssembler roleAssembler;
    private final UserRepository userRepository;
    public List<RoleDto> getRoles() {
        return roleRepository.findAll()
                .stream()
                .map(roleAssembler::map)
                .collect(Collectors.toList());
    }

    public RoleDto getRole(Long id) {
        return roleRepository.findById(id)
                .map(roleAssembler::map).orElse(null);
    }

    public void removeRole(Long id) {
        Role role = roleRepository.findById(id).orElse(null);

        if(ObjectUtils.isEmpty(role)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        List<User> usersInRole = userRepository.findByRoleId(id);

        if(!ObjectUtils.isEmpty(usersInRole)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can't remove this role due to connection with some users.");
        }

        roleRepository.deleteById(id);
    }
}
