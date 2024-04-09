package com.teamstatic.popkornback.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.OrderDetailService;
import com.teamstatic.popkornback.service.UserService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/api/orderdetail")
public class OrderDetailController {

    OrderDetailService odService;
    UserService uservice;
    PasswordEncoder passwordEncoder;

    @PostMapping("/saveOrderDetail")
    public List<OrderDetail> saveOrderDetail(@RequestBody List<OrderDetail> orderDetail) {

        List<OrderDetail> list;

        if (!orderDetail.isEmpty() && orderDetail.size() > 0) {
            list = odService.save(orderDetail);
            return list;
        } else {
            return null;
        }
    }

    @GetMapping("/orderlist")
    public ResponseEntity<List<OrderDetail>> findByMerchantUid(@RequestParam String merchantUid) {
        List<OrderDetail> orders = odService.findByMerchantUid(merchantUid);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/emailcheck")
    public ResponseEntity<Boolean> emailcheck(@RequestParam String emailinput) {
        Optional<User> user = uservice.findById(emailinput);
        return ResponseEntity.ok(user.isPresent());
    }

    @PostMapping("/makeorderkey")
public ResponseEntity<String> makeorderkey(@RequestBody Map<String, String> requestBody) {
    String id = requestBody.get("id");
    String password = requestBody.get("password");

    User user = new User();
    String encodedPassword = passwordEncoder.encode(password);

    user.setId(id);
    user.setPassword(encodedPassword);
    user.setNickname(password);
    user.setStatus("unsigned");
    try {
        uservice.save(user);
        return ResponseEntity.ok("주문키 생성 성공");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("주문키 생성 실패");
    }
}

@PostMapping("/inquiry")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");

        Optional<User> user = uservice.findById(emailinput);

        if (user.isPresent()) {
            String password = user.get().getPassword();
            if (passwordEncoder.matches(pwinput, password)) {
                return ResponseEntity.ok(user.get().getId());
            } else {
                return ResponseEntity.ok("Login failed");
            }
        } else {
            return ResponseEntity.ok("Login failed");
        }
    }


    


}
