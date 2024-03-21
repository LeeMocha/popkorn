package com.teamstatic.popkornback.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Product;

public interface ProductRepsitory extends JpaRepository<Product, Integer>{

    List<Product> findByCategorylAndCategorym(String categoryl, String categorym);

}
