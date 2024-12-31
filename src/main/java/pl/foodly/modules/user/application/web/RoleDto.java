package pl.foodly.modules.user.application.web;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {

    private Long id;
    private String name;

}
