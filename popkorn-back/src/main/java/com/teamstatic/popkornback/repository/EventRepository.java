package com.teamstatic.popkornback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamstatic.popkornback.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{
    
}
