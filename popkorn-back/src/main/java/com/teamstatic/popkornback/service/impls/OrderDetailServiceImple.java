package com.teamstatic.popkornback.service.impls;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.repository.OrderDetailRepository;
import com.teamstatic.popkornback.service.OrderDetailService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class OrderDetailServiceImple implements OrderDetailService{

   final OrderDetailRepository odRepository;

}
