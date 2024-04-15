package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.entity.Event;
import com.teamstatic.popkornback.repository.EventRepository;
import com.teamstatic.popkornback.service.EventService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{

    final EventRepository eRepository;

    public List<Event> findAll() {
        return eRepository.findAll();
    }
}

