package com.project.appt.Controllers;
import com.project.appt.Tables.Appointment;
import com.project.appt.Repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/appointment")
    public @ResponseBody Iterable<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/{id}")
    public @ResponseBody
    Optional<Appointment> getAppointment(@PathVariable int id) {
        return appointmentRepository.findById(id);
    }

    @PostMapping("/appointment")
    public @ResponseBody void createAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @PutMapping("/appointment/{id}")
    public @ResponseBody void updateAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointment/{id}")
    public @ResponseBody void deleteAppointment(@PathVariable int id) {
        appointmentRepository.deleteById(id);
    }
}
