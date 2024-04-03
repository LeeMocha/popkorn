package com.teamstatic.popkornback.service;

import com.teamstatic.popkornback.entity.Orderinfo;

public interface OrderInfoService {

    Orderinfo findByMerchantUid(String merchantUid);

}
    