package com.teamstatic.popkornback.service;

import java.util.List;
import java.util.Optional;

import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;

public interface UserService {

    PageResultDTO<UserDTO, User> pageList(PageRequestDTO requestDTO);

    List<User> findAll();

    Optional<User> findById(String id);

    PageResultDTO<UserDTO, User> findAllByKeywordLike(String keyword, PageRequestDTO requestDTO);

    List<User> findByStatus(String status);

    void deleteById(String id);

    Long countByStatus(String status);

    default User dtoToEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .reword(dto.getReword())
                .createdate(dto.getCreatedate())
                .status(dto.getStatus()).build();
    }

    default UserDTO entityToDto(User entity) {
        return UserDTO.builder()
                .id(entity.getId())
                .password(entity.getPassword())
                .nickname(entity.getNickname())
                .reword(entity.getReword())
                .createdate(entity.getCreatedate())
                .status(entity.getStatus()).build();
    }

}
