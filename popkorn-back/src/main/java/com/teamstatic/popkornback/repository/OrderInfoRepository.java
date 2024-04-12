package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Orderinfo;


public interface OrderInfoRepository extends JpaRepository<Orderinfo, String>{

    List<Orderinfo> findByMerchantUid(String merchantUid);

    List<Orderinfo> findByBuyerEmail(String email);

    int countByBuyerEmailAndStatus(String buyerEmail, String status);

}

