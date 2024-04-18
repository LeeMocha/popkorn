package com.teamstatic.popkornback.domain;

import java.sql.Date;
import java.time.LocalDate;

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
public class EventDTO {
    private int ecode;
    private LocalDate startdata;
    private LocalDate enddata;
    private String title;
    private int type;
    private String image1;
    private String content;
}
