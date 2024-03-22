package com.teamstatic.popkornback.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.domain.UserDTO;

import com.teamstatic.popkornback.entity.User;


public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT * FROM user u WHERE " +
            "u.id LIKE %:keyword% OR " +
            "u.nickname LIKE %:keyword% OR " +
            "u.reword LIKE %:keyword% OR " +
            "u.createDate LIKE %:keyword%", nativeQuery = true)
    Page<User> findAllByKeywordLike(String keyword, Pageable pageable);

    List<User> findByStatus(String status);

    Optional<User> findById(String id);

    Long countByStatus(String status);

    User save(User user);
}
