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

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'album' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewAlbum(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'photo' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewPhoto(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE pcode IN (SELECT MIN(pcode) FROM product WHERE categoryl = 'goods' GROUP BY productname) ORDER BY receiptdate DESC", nativeQuery = true)
    Page<Product> findNewGoods(Pageable pageable);

    @Query("SELECT p " +
    "FROM Product p " +
    "WHERE p.artist = :artist " +
    "AND p.pcode IN (SELECT MIN(p2.pcode) " +
                    "FROM Product p2 " +
                    "WHERE p2.artist = :artist " +
                    "GROUP BY p2.productname)")
    List<Product> findFirstProductByArtist(String artist);

    Product findByPcode(int pcode);

}
