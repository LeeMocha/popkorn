package com.teamstatic.popkornback.domain;


import org.springframework.data.domain.Page;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.teamstatic.popkornback.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class UserDTO {

    private String id;

    @JsonIgnore
    private String password;
    private String nickname;
    private int reword;
    private String createdate;
    private String status;
}
