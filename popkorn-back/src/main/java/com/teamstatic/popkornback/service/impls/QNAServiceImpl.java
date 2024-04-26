package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QNADTO;
import com.teamstatic.popkornback.entity.QNA;
import com.teamstatic.popkornback.repository.QNARepository;
import com.teamstatic.popkornback.service.QNAService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QNAServiceImpl implements QNAService {

  @Autowired
  private QNARepository qRepository;

  @Override
  public PageResultDTO<QNADTO, QNA> findAllByTitle(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("createdat").descending());
    Page<QNA> result = qRepository.findAllByTitle(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAllByID(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("createdat").descending());
    Page<QNA> result = qRepository.findAllByID(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAllByContent(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("createdat").descending());
    Page<QNA> result = qRepository.findAllByContent(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAll(PageRequestDTO requestDTO) {
    Sort sort = Sort.by("createdat").descending();
    Pageable pageable = requestDTO.getPageable(sort);
    Page<QNA> result = qRepository.findAll(pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

}
