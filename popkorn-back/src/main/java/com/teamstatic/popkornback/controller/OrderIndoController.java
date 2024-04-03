package com.teamstatic.popkornback.controller;

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
    public Orderinfo findByMerchantUid(@RequestParam String merchantUid){
        Orderinfo response = oiService.findByMerchantUid(merchantUid);
        return response;
    }

}
