package com.teamstatic.popkornback.service;

import java.time.LocalDate;

import com.teamstatic.popkornback.entity.Attendance;

public interface AttendanceService {

    void save(Attendance entity);

    boolean checkAttendanceByDate(String id, LocalDate date);

}
