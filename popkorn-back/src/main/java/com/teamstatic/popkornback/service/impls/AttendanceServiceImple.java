package com.teamstatic.popkornback.service.impls;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Attendance;
import com.teamstatic.popkornback.repository.AttendanceRepository;
import com.teamstatic.popkornback.service.AttendanceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImple implements AttendanceService {
    
    final AttendanceRepository aRepository;

    public void save(Attendance entity){
        aRepository.save(entity);
    };

}
