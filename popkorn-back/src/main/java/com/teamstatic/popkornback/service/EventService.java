package com.teamstatic.popkornback.service;

import java.util.List;

import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.entity.Event;

public interface EventService {
    List<Event> findAll();

    void deleteByecode(int ecode);
}
