package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QNADTO;
import com.teamstatic.popkornback.entity.QNA;
import com.teamstatic.popkornback.service.QNAService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class QNAController {

    @Autowired
    private QNAService qnaService;

    @GetMapping("/searchlist")
    public PageResultDTO<QNADTO, QNA> searchlist(String searchType, String keyword, int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(10)
                .keyword(keyword)
                .build();

        switch (searchType) {
            case "Title":
                return qnaService.findAllByTitle(keyword, requestDTO);
            case "ID":
                return qnaService.findAllByID(keyword, requestDTO);
            case "Content":
                return qnaService.findAllByContent(keyword, requestDTO);
            default:
                return qnaService.findAll(requestDTO);
        }
    }

}
