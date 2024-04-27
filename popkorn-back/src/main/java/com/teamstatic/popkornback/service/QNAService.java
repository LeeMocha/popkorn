package com.teamstatic.popkornback.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QNADTO;
import com.teamstatic.popkornback.entity.QNA;

public interface QNAService {

  default QNADTO entityToDto(QNA qna) {
    if (qna == null)
      return null;
    return QNADTO.builder()
        .sno(qna.getSno())
        .root(qna.getRoot())
        .category(qna.getCategory())
        .title(qna.getTitle())
        .content(qna.getContent())
        .id(qna.getId())
        .createdat(qna.getCreatedat())
        .build();
  }

  PageResultDTO<QNADTO, QNA> findAllByTitle(String Refund, PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findAllByID(String transaction, PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findAllByContent(String etc, PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findAll(PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findAllPosts(PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findPostsByCategory(String category, PageRequestDTO requestDTO);

  PageResultDTO<QNADTO, QNA> findByCategoryAndKeyword(String category, String keyword, Pageable pageable);
  
  QNA updatePost(int sno, QNA updatedPost);

  void deletePost(int sno);
}
