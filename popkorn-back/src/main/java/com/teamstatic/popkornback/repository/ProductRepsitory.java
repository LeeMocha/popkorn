package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Product;

public interface ProductRepsitory extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE p.categoryl = :categoryl AND p.categorym = :categorym AND p.pcode IN (SELECT MIN(p2.pcode) FROM Product p2 WHERE p2.categorym =:categorym GROUP BY p2.productname)")
    Page<Product> findByCategorylAndCategorym(String categoryl, String categorym, Pageable pageable);

    List<Product> findByProductname(String productname);

    @Query("SELECT p " +
    "FROM Product p " +
    "WHERE p.artist = :artist " +
    "AND p.pcode IN (SELECT MIN(p2.pcode) " +
                    "FROM Product p2 " +
                    "WHERE p2.artist = :artist " +
                    "GROUP BY p2.productname)")
    List<Product> findFirstProductByArtist(String artist);

    // 컨트롤러 에서 판별 categoryl new categorym all 이면 하위 메서드 호출 위에서 안쓰고 
    // 상품별로 가져올 앨범 8개 포토 8개 굿즈 8개 receipdate 기준 desc로 판별, 그룹 바이 
    // categoryl 로 구별인데 이거는 view q  

}
