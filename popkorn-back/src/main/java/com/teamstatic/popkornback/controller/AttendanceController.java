package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.entity.Attendance;
import com.teamstatic.popkornback.service.AttendanceService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
@AllArgsConstructor
public class AttendanceController {
    
    AttendanceService aService;

    @GetMapping("/insert")
    public void requestMethodName(String id) {

        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        Attendance  entity = Attendance.builder().id(id).status("absance").regdate(seoulLocalDateTime).build();

        aService.save(entity);

    }
    
}
