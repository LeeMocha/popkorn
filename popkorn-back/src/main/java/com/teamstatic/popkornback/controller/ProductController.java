package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;



@AllArgsConstructor
@RequestMapping("/api/product")
@RestController
public class ProductController {


    ProductService pService;

    @GetMapping("/productlist")
    public PageResultDTO<ProductDTO, Product> getMethodName(int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .build();
        PageResultDTO<ProductDTO, Product> resultDTO = pService.findAll(requestDTO);
        resultDTO.setDashboard1(pService.countAll());
        // resultDTO.setDashboard2(pService.countBy("signed"));
        // resultDTO.setDashboard3(pService.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/findByCategorylAndCategorym")
    public PageResultDTO<ProductDTO, Product> findByCategorylAndCategorym(String categoryl, String categorym,
            int page) {


        if(categoryl.equals("new")){
            PageRequestDTO requestDTO = PageRequestDTO.builder()
            .page(page)
            .size(8)
            .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findNewAll(requestDTO);
            return resultDTO;

        } else {
            PageRequestDTO requestDTO = PageRequestDTO.builder()
            .page(page)
            .size(20)
            .categoryl(categoryl)
            .categorym(categorym)
            .build();

            PageResultDTO<ProductDTO, Product> resultDTO = pService.findByCategorylAndCategorym(categoryl, categorym,
                    requestDTO);
            return resultDTO;
        }

    }

    @GetMapping("/selectoption")
    public List<Product> selectoption(String productname) {
        List<Product> list = pService.findByProductname(productname);
        return list;
    }

    @GetMapping("/findByArtist")
    public List<Product> getMethodName(@RequestParam String artist) {
        List<Product> list = pService.findFirstProductByArtist(artist);
        return list;
    }
    
    @PostMapping("/checkDetailCount")
    public boolean checkDetailCount(@RequestBody List<OrderDetail> orderDetails) {
        for (OrderDetail orderDetail : orderDetails) {
            if(orderDetail.getDetailcount() > pService.findByPcode(orderDetail.getPcode()).getStock()){
                return false;
            }
        }

        return true;
    }
    

}
