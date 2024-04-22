package com.teamstatic.popkornback.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.EventDTO;
import com.teamstatic.popkornback.entity.Event;
import com.teamstatic.popkornback.service.EventService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/event")
public class EventController {
    EventService eService;

    @GetMapping("/eventlist")
    public List<Event> eventList() {
        return eService.findAll();
    }

    @GetMapping("/deleteByecode")
    public List<Event> deleteByecode(@RequestParam int ecode) {
        eService.deleteByecode(ecode);
        return eventList();
    }
}
