package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.repository.OrderInfoRepository;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderInfoServiceImple implements OrderInfoService{
    
    private final OrderInfoRepository oiRepository;

     public List<Orderinfo> findByMerchantUid(String merchantUid) {
        return oiRepository.findByMerchantUid(merchantUid);
    }
    
    @Override
    public List<Orderinfo> findByEmail(String email) {
        return oiRepository.findByBuyerEmail(email);
    }

    @Override
    public int countPaid(String buyerEmail, String status) {
        return oiRepository.countByBuyerEmailAndStatus(buyerEmail, status);
    }

    public List<Orderinfo> findByImpUid(String impUid){
        return oiRepository.findByImpUid(impUid);
    };

    public Orderinfo save(Orderinfo entity){
        return oiRepository.save(entity);
    }

    @Override
    public List<Orderinfo> getOrderInfo() {
        return oiRepository.findAll();
    }
}
