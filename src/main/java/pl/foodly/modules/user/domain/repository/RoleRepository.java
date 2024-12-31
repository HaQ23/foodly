package pl.foodly.modules.user.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.user.domain.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
