package com.teamstatic.popkornback.service;

import java.util.List;

import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Orderinfo;

public interface PaymentService {
    
    void savePaymentData(List<OrderDetail> orderDetail, Payment payment, String id);

    List<Orderinfo> findByStatus(String status);

    

}
