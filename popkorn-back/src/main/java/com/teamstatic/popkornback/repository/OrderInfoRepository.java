package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Orderinfo;


public interface OrderInfoRepository extends JpaRepository<Orderinfo, String>{

    Orderinfo findByMerchantUid(String merchantUid);

}
