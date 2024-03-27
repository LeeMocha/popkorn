package com.teamstatic.popkornback.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.CartService;
import com.teamstatic.popkornback.service.OrderDetailService;
import com.teamstatic.popkornback.service.PaymentService;
import com.teamstatic.popkornback.service.ProductService;
import com.teamstatic.popkornback.service.UserService;

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
   @Autowired
   CartService cService;
   @Autowired
   UserService uService;

   private PaymentsController() {
      this.iamportClient = new IamportClient("3803508415015286",
            "hflvwap97oFoYSjRe3uTfEgy0CLNw0bXMfV7Og1UAUjgpS29O3buAQ3Lgw7ntgNNOjNfmIcDteoBNAzl");
   }
   
   @PostMapping("/datatoserver")
   public IamportResponse<Payment> kakaoPay(@RequestBody Map<String, Object> request)
         throws IamportResponseException, IOException {
      System.out.println(request.get("items"));
      String imp_uid = (String) request.get("imp_uid");
      String id = (String) request.get("id");
      List<Map<String, Object>> items = (List<Map<String, Object>>) request.get("items");
      List<OrderDetail> orderDetail = new ArrayList<>();

      for (Map<String, Object> item : items) {
         OrderDetail detail = new OrderDetail();
         detail.setMerchantUid((String) item.get("merchantUid"));
         detail.setPcode((int) item.get("pcode"));
         detail.setProductname((String) item.get("productname"));
         detail.setPrice((int) item.get("price"));
         detail.setDetailcount((int) item.get("detailcount"));
         detail.setAlternative((String) item.get("alternative"));
         detail.setImage1((String) item.get("image1"));
         orderDetail.add(detail);
     }
      
      IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);

      Payment payment = paymentIamportResponse.getResponse();

      for (OrderDetail product : orderDetail) {
         if (product.getDetailcount() > pService.findByPcode(product.getPcode()).getStock()) {
            iamportClient.cancelPaymentByImpUid(new CancelData(imp_uid, true));
            return null;
         }
      }

      // 결제 요청에 문제가 없어 Payment 테이블에 주문 내역 정보 저장.
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

      // 1.Product table => pcode에 해당하는 상품 stock 필드값 반영.
      for (OrderDetail orderDetail2 : orderDetail) {
         Product product = pService.findByPcode(orderDetail2.getPcode());
         product.setStock(product.getStock() - orderDetail2.getDetailcount());
         pService.save(product);
      }

      // 2.Cart table => 해당하는 id와 pcode의 cart 물품 삭제.
      // 3. User table => 해당하는 id 의 reword 값 반영
      // => 비회원인 경우 실행 안함.
      System.out.println("***************"+id+"***********");
      if (id != null) {
         for (OrderDetail orderDetail2 : orderDetail) {
            cService.deleteByIdAndPcode(id, orderDetail2.getPcode());
         }
         User user = uService.findById(id).get();
         user.setReword(user.getReword() + (payment.getAmount().intValue() / 1000));
         System.out.println((payment.getAmount().intValue() / 1000)); 
         uService.save(user);
      }

      // 4. 해당 주문번호와 그 값들 OrderDetail 처리
      // 위에 uService save 메서드 reword 반영안되는거 확인하기

      return paymentIamportResponse;

   }

}
