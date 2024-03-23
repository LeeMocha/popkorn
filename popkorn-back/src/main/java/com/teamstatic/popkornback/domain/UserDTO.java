package com.teamstatic.popkornback.domain;

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

    private String password;
    private String nickname;
    private int reword;
    private String createdate;
    private String status;
}
