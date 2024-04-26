package com.teamstatic.popkornback.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.QNA;

public interface QNARepository  extends JpaRepository<QNA,Integer>{

  @Query(value = "SELECT * FROM QNA WHERE title LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByTitle(String keyword, Pageable pageable);
  
  @Query(value = "SELECT * FROM QNA WHERE id LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByID(String keyword, Pageable pageable);
  
  @Query(value = "SELECT * FROM QNA WHERE content LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByContent(String keyword , Pageable pageable);

}
