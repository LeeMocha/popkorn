package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class User {
    
    @Id
    private String id;

    private String password;
    private String nickname;
    private int reword;
    private String createdate;

    private String status;

}

