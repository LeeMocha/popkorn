package com.teamstatic.popkornback.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.QNA;

public interface QNARepository extends JpaRepository<QNA, Integer> {

  @Query(value = "SELECT * FROM QNA WHERE title LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByTitle(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM QNA WHERE id LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByID(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM QNA WHERE content LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
  Page<QNA> findAllByContent(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM QNA q WHERE " +
      "(q.title LIKE CONCAT('%', :keyword, '%') OR " +
      "q.id LIKE CONCAT('%', :keyword, '%') OR " +
      "q.content LIKE CONCAT('%', :keyword, '%')) ", nativeQuery = true)
  Page<QNA> findAllByKeywordLike(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM QNA WHERE category = :category", nativeQuery = true)
  Page<QNA> findByCategory(String category, Pageable pageable);

  @Query("SELECT q FROM QNA q WHERE q.category = :category AND " +
      "(q.title LIKE %:keyword% OR q.id LIKE %:keyword% OR q.content LIKE %:keyword%)")
  Page<QNA> findByCategoryAndKeyword(String category, String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM QNA WHERE sno = :sno", nativeQuery = true)
  QNA findBySno(int sno);

  @Query(value ="DELETE FROM QNA WHERE sno = :sno", nativeQuery = true)
  void deleteBySno(int sno);
}
