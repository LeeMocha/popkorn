package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Celeb;
import com.teamstatic.popkornback.service.CelebService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@AllArgsConstructor
@RestController
@RequestMapping("/api/celeb")
public class CelebController {
   
   CelebService celebService;

   @GetMapping("/celeblist")
   public List<Celeb> getMethodName() {
       return celebService.findAll();
   }
   

}
