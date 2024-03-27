package com.teamstatic.popkornback.service.impls;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Payment;
import com.teamstatic.popkornback.repository.PaymentRepository;
import com.teamstatic.popkornback.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImple implements PaymentService{
    
    private final PaymentRepository payRepository;

    public Payment savePaymentData(Payment payment){
        return payRepository.save(payment);
    }

}
