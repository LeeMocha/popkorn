package com.teamstatic.popkornback.service.impls;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

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
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<QNA> result = qRepository.findAllByTitle(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAllByID(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<QNA> result = qRepository.findAllByID(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAllByContent(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<QNA> result = qRepository.findAllByContent(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAll(PageRequestDTO requestDTO) {
    Sort sort = Sort.by("postcreated").descending();
    Pageable pageable = requestDTO.getPageable(sort);
    Page<QNA> result = qRepository.findAllByKeywordLike(requestDTO.getKeyword(), pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findAllPosts(PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<QNA> result = qRepository.findAll(pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findPostsByCategory(String category, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<QNA> result = qRepository.findByCategory(category, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QNADTO, QNA> findByCategoryAndKeyword(String category, String keyword, Pageable pageable) {
    Page<QNA> result = qRepository.findByCategoryAndKeyword(category, keyword, pageable);
    return new PageResultDTO<>(result,this::entityToDto);
  }

  @Override
  public QNA updatePost(int sno, QNA updatedPost) {
    QNA post = qRepository.findBySno(sno);
    post.setTitle(updatedPost.getTitle());
    post.setContent(updatedPost.getContent());
    return qRepository.save(post);
}

@Override
public QNA updateReply(int sno, QNA updatedComment) {
  QNA comment = qRepository.findById(sno)
      .orElseThrow(() -> new RuntimeException("Comment not found with sno: " + sno));
  comment.setContent(updatedComment.getContent());
  return qRepository.save(comment);
}

@Override
public void deletePost(int sno) {
    Optional<QNA> post = qRepository.findById(sno);
    if (post.isPresent()) {
        qRepository.delete(post.get());
    } else {
        throw new EntityNotFoundException("No QNA found with SNO: " + sno);
    }
}

@Override
public QNA createQna(QNA qna) {
  return qRepository.save(qna);
}

@Override
public long getCommentCountForPost(int sno) {
  return qRepository.countByRoot(sno);
}

}
