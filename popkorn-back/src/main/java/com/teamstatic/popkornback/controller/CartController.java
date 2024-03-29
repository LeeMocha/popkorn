package com.teamstatic.popkornback.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.service.CartService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cart")
public class CartController {

    CartService cService;
    CartRepository cRepository;

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

    @DeleteMapping("/delete")
    public void deletecart(String id, int pcode) {
        cService.deleteByIdAndPcode(id, pcode);
    }

}
