package com.teamstatic.popkornback.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @CreationTimestamp
    private LocalDateTime createdate;
    public void setCreatedate(LocalDateTime createdate) {
        this.createdate = createdate;
    }

    private String status;

}

