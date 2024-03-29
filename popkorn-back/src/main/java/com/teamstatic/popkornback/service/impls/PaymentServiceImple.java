package com.teamstatic.popkornback.service.impls;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.Payment;
import com.teamstatic.popkornback.entity.OrderDetail;
import com.teamstatic.popkornback.entity.Orderinfo;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.repository.OrderDetailRepository;
import com.teamstatic.popkornback.repository.PaymentRepository;
import com.teamstatic.popkornback.repository.ProductRepsitory;
import com.teamstatic.popkornback.repository.UserRepository;
import com.teamstatic.popkornback.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImple implements PaymentService {

    private final PaymentRepository payRepository;
    private final ProductRepsitory pRepsitory;
    private final CartRepository cRepository;
    private final UserRepository uRepository;
    private final OrderDetailRepository odRepository;

    @Transactional(rollbackFor = {Exception.class})
    public void savePaymentData(List<OrderDetail> orderDetail, Payment payment, String id) {

            // 결제 요청에 문제가 없어 Payment 테이블에 주문 내역 정보 저장.
            Orderinfo orderinfoEntity = Orderinfo.builder()
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
            payRepository.save(orderinfoEntity);

            // 1.Product table => pcode에 해당하는 상품 stock, releasing 필드값 반영.
            for (OrderDetail orderDetail2 : orderDetail) {
                Product product = pRepsitory.findByPcode(orderDetail2.getPcode());
                product.setStock(product.getStock() - orderDetail2.getDetailcount());
                product.setReleasing(product.getReleasing() + orderDetail2.getDetailcount());
                pRepsitory.save(product);
            }

            // 2.Cart table => 해당하는 id와 pcode의 cart 물품 삭제.
            // 3. User table => 해당하는 id 의 reword 값 반영
            // => 비회원인 경우 실행 안함.
            if (id != null) {
                for (OrderDetail orderDetail2 : orderDetail) {
                    cRepository.deleteByIdAndPcode(id, orderDetail2.getPcode());
                }
                User user = uRepository.findById(id).get();
                user.setReword(user.getReword() + (int) (payment.getAmount().intValue() * 0.01));
                uRepository.save(user);
            }

            // 4. 해당 주문번호와 그 값들 OrderDetail 처리
            odRepository.saveAll(orderDetail);
    }

    
     @Override
    public List<Orderinfo> findByStatus(String status) {
        return payRepository.findByStatus(status);
    }

}
