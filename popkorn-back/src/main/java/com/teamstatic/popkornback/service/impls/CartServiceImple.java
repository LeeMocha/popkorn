package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImple implements CartService {

    final CartRepository cRepository;

    public List<Cart> findById(String id) {
        return cRepository.findById(id);
    }

    public Cart findByIdAndPcode(String id, int pcode) {
        return cRepository.findByIdAndPcode(id, pcode);
    }

    public Cart save(Cart entity) {
        return cRepository.save(entity);
    }

    public void deleteItems(List<Integer> itemIds) {
        for (Integer itemId : itemIds) {
            cRepository.deleteById(itemId);
        }
    }
}
