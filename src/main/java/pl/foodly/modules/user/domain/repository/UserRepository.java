package pl.foodly.modules.user.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.foodly.modules.user.domain.entity.Role;
import pl.foodly.modules.user.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByRoleId(Long id);
}
