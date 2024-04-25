package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Snakegame;
import com.teamstatic.popkornback.service.SnakegameService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    
    SnakegameService sgService;

    @PostMapping("/snakegame/getrecord")
    public List<Snakegame> getRecord(@RequestBody String nickname) {
        String result = nickname.replace("\"", "");
        return sgService.findTop3RecordsAndMe(result);
    }
    
    @PostMapping("/snakegame/insertrecord")
    public List<Snakegame> postMethodName(@RequestBody Snakegame entity) {
        
        entity.setNickname(entity.getNickname().replace("\"", ""));
        Optional<Snakegame> userhistory = sgService.findById(entity.getNickname());
    

        if(!userhistory.isPresent() || userhistory.get().getRecord()<entity.getRecord()){
            sgService.save(entity);
        }

        return sgService.findTop3RecordsAndMe(entity.getNickname());
    }
    

}
