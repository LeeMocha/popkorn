package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Orderinfo;

public interface OrderInfoRepository extends JpaRepository<Orderinfo, String> {

    List<Orderinfo> findByMerchantUid(String merchantUid);

    List<Orderinfo> findByBuyerEmail(String email);

    int countByBuyerEmailAndStatus(String buyerEmail, String status);

    List<Orderinfo> findByImpUid(String impUid);

    @Query(value = "SELECT * FROM orderinfo WHERE merchant_uid LIKE CONCAT('%', :merchantUid, '%') AND status != 'Refund'", nativeQuery = true)
    Page<Orderinfo> findAllByMerchantUid(String merchantUid, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Email LIKE CONCAT('%', :email, '%') AND status != 'Refund'", nativeQuery = true)
    Page<Orderinfo> findAllByBuyerEmail(String email, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo WHERE buyer_Tel LIKE CONCAT('%', :tel, '%') AND status != 'Refund'", nativeQuery = true)
    Page<Orderinfo> findAllByBuyerTel(String tel, Pageable pageable);

    @Query(value = "SELECT * FROM orderinfo o WHERE " +
            "(o.merchant_uid LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_email LIKE CONCAT('%', :keyword, '%') OR " +
            "o.buyer_tel LIKE CONCAT('%', :keyword, '%')) " +
            "AND o.status != 'Refund'", nativeQuery = true)
    Page<Orderinfo> findAllByKeywordLike(String keyword, Pageable pageable);

    List<Orderinfo> findByStatusNot(String status);

}
