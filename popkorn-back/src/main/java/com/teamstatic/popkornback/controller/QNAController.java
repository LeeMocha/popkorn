package com.teamstatic.popkornback.controller;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/posts")
    public PageResultDTO<QNADTO, QNA> getPostsByCategory(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10) Pageable pageable) {

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(Math.max(0, pageable.getPageNumber()))
                .size(pageable.getPageSize())
                .build();

        if (category == null || category.equalsIgnoreCase("all")) {
            return qnaService.findAllPosts(requestDTO);
        } else {
            return qnaService.findPostsByCategory(category, requestDTO);
        }
    }

    @PatchMapping("/{sno}")
    public QNA updateQnaPost(@PathVariable("sno") int sno, @RequestBody QNA post) {
        try {
            QNA updatedPost = qnaService.updatePost(sno, post);
            System.out.println("POST는"+ post);
            if (updatedPost == null) {
                throw new Exception("Update failed");
            }
            System.out.println("updatepost는"+updatedPost);
            return updatedPost;
        } catch (Exception e) {
            System.out.println("Error updating post: " + e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/{sno}")
    public void deleteQnaPost(@PathVariable Integer sno) {
        try {
            qnaService.deletePost(sno);
        } catch (Exception e) {

        }
    }

}
