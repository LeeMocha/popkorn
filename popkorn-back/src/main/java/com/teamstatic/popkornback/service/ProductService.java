package com.teamstatic.popkornback.service;



import java.util.List;

import com.teamstatic.popkornback.entity.Product;

public interface ProductService {

    List<Product> findByCategorylAndCategorym(String categoryl, String categorym);
    
}
