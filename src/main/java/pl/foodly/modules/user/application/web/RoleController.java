package pl.foodly.modules.user.application.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.foodly.modules.user.application.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public List<RoleDto> getRoles() {
        return roleService.getRoles();
    }

    @GetMapping("/{id}")
    public RoleDto getRole(@PathVariable Long id) {
        return roleService.getRole(id);
    }

    @DeleteMapping("/{id}")
    public void removeRole(@PathVariable Long id) {
        roleService.removeRole(id);
    }
}
