package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.repository.CelebRepository;
import com.teamstatic.popkornback.service.CelebService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Service
@Log4j2
@RequiredArgsConstructor
public class CelebServiceImple implements CelebService{

   final CelebRepository celebRepository;

   public List<Celeb> findAll(){
      return celebRepository.findAll();
   }

}
