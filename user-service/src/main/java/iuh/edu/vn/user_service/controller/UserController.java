package iuh.edu.vn.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import iuh.edu.vn.user_service.dto.UserRegisteredEvent;
import iuh.edu.vn.user_service.dto.UserRequest;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Cho phép Frontend gọi API [cite: 92]
public class UserController {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    // Danh sách giả lập thay cho Database để làm cho nhanh
    private List<UserRequest> users = new ArrayList<>();

    @PostMapping("/register") // API Đăng ký [cite: 157]
    public String register(@RequestBody UserRequest request) {
        // 1. Lưu user vào danh sách (giả lập DB)
        users.add(request);
        System.out.println("User mới: " + request.getUsername());

        // 2. Bắn Event USER_REGISTERED lên Broker 
        UserRegisteredEvent event = new UserRegisteredEvent(
            request.getUsername(), 
            "Chào mừng thành viên mới!"
        );
        
        // "USER_REGISTERED" là tên topic mà Người 5 sẽ lắng nghe
        kafkaTemplate.send("USER_REGISTERED", event); 

        return "Đăng ký thành công và đã bắn Event!";
    }

    @PostMapping("/login") // API Đăng nhập [cite: 158]
    public String login(@RequestBody UserRequest request) {
        // Logic login đơn giản: duyệt list xem có user đó không
        return "Đăng nhập thành công!";
    }
}