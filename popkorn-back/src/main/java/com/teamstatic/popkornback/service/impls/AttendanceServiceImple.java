package com.teamstatic.popkornback.service.impls;

import java.time.LocalDate;
import java.util.List;

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

    public boolean checkAttendanceByDate(String id, LocalDate date){

        System.out.println(aRepository.findByUserIdAndRegdate(id, date));

        List<Attendance> result = aRepository.findByUserIdAndRegdate(id, date);

        if(result.isEmpty()){
            return true;
        }else {
            return false;
        }
    }

}
