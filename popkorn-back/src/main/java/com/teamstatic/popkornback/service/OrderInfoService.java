package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.entity.Orderinfo;

public interface OrderInfoService {

    List<Orderinfo> findByMerchantUid(String merchantUid);
    
    public List<Orderinfo> findByEmail(String email);

    int countPaid(String buyerEmail, String status);

    List<Orderinfo> findByImpUid(String impUid);

    Orderinfo save(Orderinfo entity);

}
