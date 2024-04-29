package com.teamstatic.popkornback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.NoticeDTO;
import com.teamstatic.popkornback.entity.Notices;
import com.teamstatic.popkornback.entity.Snakegame;
import com.teamstatic.popkornback.service.NoticeService;
import com.teamstatic.popkornback.service.SnakegameService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    
    SnakegameService sgService;
    NoticeService nService;

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
    
        @PostMapping("/notices/insert")
    public List<Notices> insertNotices(@RequestBody NoticeDTO noticeDTO) {
        // NoticeDTO noticeDTO = NoticeDTO.builder()
        //         .id(id)
        //         .content(content)
        //         .build();

        Notices notice = new Notices();
        notice.setId(noticeDTO.getId());
        notice.setContent(noticeDTO.getContent());

        nService.save(notice);
        return getNotices();
    }

    @GetMapping("/notices/getnotices")
    public List<Notices> getNotices() {
        return nService.findAll();
    }

}
