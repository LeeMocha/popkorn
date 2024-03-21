package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.repository.ProductRepsitory;
import com.teamstatic.popkornback.service.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService{
    
    final ProductRepsitory pRepsitory;

    public List<Product> findByCategorylAndCategorym(String categoryl, String categorym){
        return pRepsitory.findByCategorylAndCategorym(categoryl, categorym);
    }  

}
