package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Cart;
import com.teamstatic.popkornback.repository.CartRepository;
import com.teamstatic.popkornback.service.CartService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class CartServiceImple implements CartService{
    
    final CartRepository cRepository;

    public List<Cart> findById(String id){
        return cRepository.findById(id);
    }

    public Cart findByIdAndPcode(String id, int pcode){
        return cRepository.findByIdAndPcode(id, pcode);
    }

    public Cart save(Cart entity){
        return cRepository.save(entity);
    }

}
