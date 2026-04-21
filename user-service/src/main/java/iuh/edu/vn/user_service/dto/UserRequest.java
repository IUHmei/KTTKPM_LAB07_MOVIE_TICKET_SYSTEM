package iuh.edu.vn.user_service.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String password;
}