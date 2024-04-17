package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/member")
@AllArgsConstructor
public class MemberController {
    
    CartService cService;

    @PostMapping("/cart/addcart")
    public void saveCart(@RequestBody Cart entity) {
        Cart existingCart = cService.findByIdAndPcode(entity.getId(), entity.getPcode());
        if (existingCart != null) {
            existingCart.setDetailcount(existingCart.getDetailcount() + entity.getDetailcount());
            cService.save(existingCart);
        } else {
            cService.save(entity);
        }
    }

}
