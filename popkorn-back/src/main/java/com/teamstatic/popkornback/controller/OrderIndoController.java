package com.teamstatic.popkornback.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.service.OrderInfoService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/api/orderinfo")
@RestController
@AllArgsConstructor
public class OrderIndoController {

    OrderInfoService oiService;

    @GetMapping("/findByMerchantUid")
    public List<Orderinfo> findByMerchantUid(@RequestParam String merchantUid) {
        List<Orderinfo> response = oiService.findByMerchantUid(merchantUid);
        return response;
    }

    @GetMapping("/findByEmail")
    public List<Orderinfo> findByEmail(@RequestParam String email) {
        List<Orderinfo> response = oiService.findByEmail(email);
        return response;
    }

    @GetMapping("/countByStatus")
    public List<Integer> countOrdersByStatus(@RequestParam String buyerEmail) {
        List<Integer> count = new ArrayList<>();
        count.add(oiService.countPaid(buyerEmail, "paid"));
        count.add(oiService.countPaid(buyerEmail, "readyforship"));
        count.add(oiService.countPaid(buyerEmail, "shipping"));
        count.add(oiService.countPaid(buyerEmail, "deliveried"));
        System.out.println(count);
        return count;
    }

    @GetMapping("/orderinfoinquiry")
    public List<Orderinfo> getOrderInfo() {
        return oiService.getOrderInfo();
    }

    @PostMapping("/refundrequest")
    public boolean postMethodName(@RequestBody Orderinfo entity) {
        
        entity.setStatus("refund request");
        if(oiService.findByImpUid(entity.getImpUid()).size()>0){
            oiService.save(entity);
            return true;
        } else {
            return false;
        }

    }
    

}
