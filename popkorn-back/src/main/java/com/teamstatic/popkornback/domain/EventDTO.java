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
public class EventDTO {
    private int ecode;
    private Data startData;
    private Data endData;
    private String title;
    private int type;
    private String image1;
    private String content;
}
