package com.teamstatic.popkornback.service.impls;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.repository.OrderInfoRepository;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderInfoServiceImple implements OrderInfoService{
    
    private final OrderInfoRepository oiRepository;

    public Orderinfo findByMerchantUid(String merchantUid){
        return oiRepository.findByMerchantUid(merchantUid);
    }

}
