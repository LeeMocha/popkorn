package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name="celebcommunity")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Celebcommunity {
    
    @Id
    private long cccode;
    private String id;
    private String artist;
    private String content;

}
