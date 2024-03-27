package com.teamstatic.popkornback.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.service.OrderDetailService;
import com.teamstatic.popkornback.service.PaymentService;
import com.teamstatic.popkornback.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;

@RequestMapping("/api/pay")
@RestController
public class PaymentsController {

   IamportClient iamportClient;

   @Autowired
   PaymentService payService;
   @Autowired
   OrderDetailService odService;
   @Autowired
   ProductService pService;

   private PaymentsController() {
      this.iamportClient = new IamportClient("3803508415015286",
            "hflvwap97oFoYSjRe3uTfEgy0CLNw0bXMfV7Og1UAUjgpS29O3buAQ3Lgw7ntgNNOjNfmIcDteoBNAzl");
   }

   @PostMapping("/datatoserver")
   public IamportResponse<Payment> kakaoPay(@RequestBody String imp_uid, @RequestBody List<OrderDetail> orderDetail)
         throws IamportResponseException, IOException {
      IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);

      Payment payment = paymentIamportResponse.getResponse();

      for (OrderDetail product : orderDetail) {
         if (product.getDetailcount() > pService.findByPcode(product.getPcode()).getStock()) {
            // 만약 주문 상품의 갯수가 재고보다 클 경우 결제요청된 부분을 환불 취소요청 하는 부분
         }
      }

      // 결제 요청에 문제가 없어 Payment 테이블에 주문 내역 정보 저장
      com.teamstatic.popkornback.entity.Payment paymentEntity = com.teamstatic.popkornback.entity.Payment.builder()
            .merchantUid(payment.getMerchantUid())
            .buyerName(payment.getBuyerName())
            .buyerEmail(payment.getBuyerEmail())
            .buyerAddr(payment.getBuyerAddr())
            .buyerPostcode(payment.getBuyerPostcode())
            .buyerTel(payment.getBuyerTel())
            .paidAmount(payment.getAmount())
            .paidAt(payment.getPaidAt())
            .status(payment.getStatus())
            .build();
      payService.savePaymentData(paymentEntity);

      // Product table => pcode에 해당하는 상품 stock 필드값 반영.

      // Cart

      return paymentIamportResponse;

   }

}
