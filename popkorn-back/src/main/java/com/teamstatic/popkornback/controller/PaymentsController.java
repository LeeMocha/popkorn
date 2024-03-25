package com.teamstatic.popkornback.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.web.bind.annotation.GetMapping;



@RequestMapping("/api/pay")
@RestController
public class PaymentsController {
   
   IamportClient iamportClient;

   private PaymentsController() {
         this.iamportClient = new IamportClient("3803508415015286","hflvwap97oFoYSjRe3uTfEgy0CLNw0bXMfV7Og1UAUjgpS29O3buAQ3Lgw7ntgNNOjNfmIcDteoBNAzl");
   }

   @GetMapping("/kakaopay/{imp_uid}")
   public IamportResponse<Payment> kakaoPay (@PathVariable String imp_uid, HttpServletRequest request) throws IamportResponseException, IOException  {
      IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);

      System.out.println("연동됐지~~");

      return paymentIamportResponse;
   }
}
