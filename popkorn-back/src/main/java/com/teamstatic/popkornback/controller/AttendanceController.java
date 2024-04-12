package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.teamstatic.popkornback.entity.Attendance;
import com.teamstatic.popkornback.service.AttendanceService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("*")
@Controller
@RequestMapping("/api/attendance")
@AllArgsConstructor
public class AttendanceController {

    AttendanceService aService;

    @GetMapping("/insert")
    public String requestMethodName(String id, Model model) {
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        // Check if attendance for today exists
        boolean attendanceExists = aService.checkAttendanceByDate(id, seoulLocalDateTime.toLocalDate());

        if (!attendanceExists) {
            model.addAttribute("message", "출석을 이미 완료 하셨습니다.");
        } else {
            Attendance entity = Attendance.builder().id(id).status("absence").regdate(seoulLocalDateTime).build();
            aService.save(entity);
            model.addAttribute("message", "출석이 완료되었습니다.");
        }

        return "attendance";
    }

}
