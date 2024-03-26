package com.teamstatic.popkornback.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="payment")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Payment {
    
    @Id
    private String merchantUid;
    private String buyerName;
    private String buyerEmail;
    private String buyerAddr;
    private String buyerPostcode;
    private String buyerTel;
    private BigDecimal paidAmount;
    private Date paidAt;
    private String status;

}
