package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.service.OrderDetailService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/api/orderdetail")
public class OrderDetailController {

    OrderDetailService odService;

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

}
