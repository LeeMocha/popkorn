package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "event")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Event {
    @Id
    private int ecode;
    private Data startData;
    private Data endData;
    private String title;
    private int type;
    private String image1;
    private String content;
}
