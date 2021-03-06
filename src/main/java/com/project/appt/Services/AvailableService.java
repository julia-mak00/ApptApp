package com.project.appt.Services;

import com.project.appt.RepoInterfaces.AvailableTimesRepoInterface;
import com.project.appt.Repositories.AvailableTimesRepository;
import com.project.appt.Tables.available_times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Service
public class AvailableService implements AvailableTimesRepoInterface {

    @Autowired
    private  AvailableTimesRepository availableTimesRepository;

    @Override
    public List<available_times> findavailable_timesByDate(String id, Date date) {return availableTimesRepository.findavailable_timesByDate(id, date); }

    @Override
    public List<available_times> findavailable_time(String id, Date date, Time start_time) {
        return availableTimesRepository.findavailable_time(id, date, start_time);
    }

    @Override
    public List<available_times> findavailable_timeByProfessorID(String id) {
        return availableTimesRepository.findavailable_timeByProfessorID(id);
    }
}