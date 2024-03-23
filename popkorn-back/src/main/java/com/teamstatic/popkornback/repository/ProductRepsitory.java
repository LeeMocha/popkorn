package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Product;

public interface ProductRepsitory extends JpaRepository<Product, Integer> {

    Page<Product> findByCategorylAndCategorym(String categoryl, String categorym, Pageable pageable);

    List<Product> findByProductname(String productname);

}
