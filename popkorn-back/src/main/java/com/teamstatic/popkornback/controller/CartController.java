package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.CartDTO;
import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.service.CartService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cart")
public class CartController {

    CartService cService;

    @GetMapping("/selectlist")
    public List<Cart> selectlist(String id) {
        return cService.findById(id);
    }

    @PostMapping("/addcart")
    public void saveCart(@RequestBody Cart entity) {
        Cart existingCart = cService.findByIdAndPcode(entity.getId(), entity.getPcode());
        if (existingCart != null) {
            existingCart.setDetailcount(existingCart.getDetailcount() + entity.getDetailcount());
            cService.save(existingCart);
        } else {
            cService.save(entity);
        }
    }

    public Cart selectOne(String id, int pcode) {
        return cService.findByIdAndPcode(id, pcode);
    }

}
