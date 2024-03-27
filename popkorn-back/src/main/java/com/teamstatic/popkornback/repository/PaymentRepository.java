package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Payment;




public interface PaymentRepository extends JpaRepository<Payment, String>{
    
}
