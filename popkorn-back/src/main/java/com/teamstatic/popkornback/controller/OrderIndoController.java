package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.AllArgsConstructor;

@RequestMapping("/api/orderinfo")
@RestController
@AllArgsConstructor
public class OrderIndoController {

    OrderInfoService oiService;

    @GetMapping("/findByMerchantUid")
    public ResponseEntity<List<Orderinfo>> findByMerchantUid(@RequestParam String merchantUid) {
        List<Orderinfo> response = oiService.findByMerchantUid(merchantUid);
        System.out.println("response는 " + response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<List<Orderinfo>> findByEmail(@RequestParam String email) {
        List<Orderinfo> response = oiService.findByEmail(email);
        return ResponseEntity.ok(response);
    }
    
}
