package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public String requestMethodName(String id) {
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        // Check if attendance for today exists
        // boolean attendanceExists =
        // aService.checkAttendanceByDate(seoulLocalDateTime.toLocalDate());

        // if (attendanceExists) {
        Attendance entity = Attendance.builder().id(id).status("absence").regdate(seoulLocalDateTime).build();
        aService.save(entity);
        return "출석이 완료되었습니다";
        // } else {
        // return "redirect:/yourPage.jsp?queryParameter=value";
        // }
    }

}
