package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.service.ProductService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RequestMapping("/api/product")
@RestController
public class ProductController {
    
    ProductService pService;

    @GetMapping("/productlist")
    public List<Product> productlist(String categoryl, String categorym) {
        System.out.println(categoryl);
        System.out.println(categorym);
        List<Product> list = pService.findByCategorylAndCategorym(categoryl, categorym);

        System.out.println(list);

        if(list.size() > 0){
            return list;
        } else {
            return null;
        }

    }

    @GetMapping("/selectoption")
    public List<Product> selectoption(String productname) {
        List<Product> list = pService.findByProductname(productname);
        return list;
    }

}
