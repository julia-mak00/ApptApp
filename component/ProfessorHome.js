import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../css/HomePage.css"

export function logOut() {
    sessionStorage.setItem("isAuthenticated", "false");
}

export default function ProfessorHome() {
    const [apptExist, setApptExist] = useState(false);
    const [appointments, setAppointments] = useState({
        appointments: [],
        appointment_id: null,
        professor_Email: null,
        student_Email: null,
        course_code: null,
        purpose: null,
        office: null,
        start_time: null,
        end_time: null,
        appointment_description: null,
        student_fname: null,
        student_lname: null,
        sent: null,
        appointment_date: null,
        professor_name: null,
    });

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        const link = "http://localhost:8080/appointment/" + sessionStorage.getItem("id").toString();

        const res = await fetch(link);
        res.json()
            .then(data => {
                if (data == null || data.length === 0)
                    setApptExist(false);
                else {
                    setApptExist(true);
                    setAppointments(data);
                }
            })
    }

    function deleteAppointment(id) {
        const link = "http://localhost:8080/appointment/" + id;

        fetch(link, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    // display when no appointments exist
    const noAppt = () =>
        <div>
            <span className="margin-auto"> You currently have no upcoming scheduled appointments... </span>
        </div>;

    const trThStyle = {
        borderBottom: '1px solid #dddddd',
        textAlign: 'left',
    };

    // display appointments
    const showAppt = () =>
        <div>
            <p>
                <table style={{width: "100%"}}>
                    <thead style ={trThStyle}>
                    <tr>
                        <th style={{padding:'10px'}}>Course Code</th>
                        <th>Purpose</th>
                        <th>Office</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Student Email</th>
                        <th>Student Name</th>
                    </tr>
                    </thead>

                    {
                        Array.isArray(appointments) && appointments.map(appt =>
                            <tbody style={trThStyle}>
                            <tr key={appt.appointment_id}>
                                <td style={{padding: '10px'}}> {appt.course_code}</td>
                                <td>{appt.purpose}</td>
                                <td>{appt.office}</td>
                                <td>{appt.appointment_date}</td>
                                <td>{appt.start_time}</td>
                                <td>{appt.end_time}</td>
                                <td>{appt.student_Email}</td>
                                <td>{appt.student_fname} {appt.student_lname}</td>
                                <td><Button type="button" onClick={() => {if (window.confirm('Are you sure you wish to remove this appointment?')) deleteAppointment(appt.appointment_id)}}>Cancel Appointment</Button></td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </p>
        </div>;

    return(
        <div className="homeWrapper">
            <div className="sidebar position-block">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="" className="simple-text">AppointMeet</a>
                    </div>
                    <ul className="nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/profHome">
                                <i className="nc-icon nc-chart-pie-35"/>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="/profHome/availableTimes">
                                <i className="nc-icon nc-pin-3"/>
                                <p>Available Times</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                <i className="nc-icon nc-pin-3"/>
                                <p>Maps</p>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="/" onClick={logOut}>
                                <i className="nc-icon nc-bell-55"/>
                                <p>Log Out</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="Header-old header-logged-in js-details-container Details position-block f4 py-2 myHeader" role="banner">
                <div className="container-xl d-lg-flex flex-items-center p-responsive flex-justify-between">
                    <div className="d-flex  flex-items-center">
                    </div>
                    <div className="d-flex flex-items-center right-0 flex-auto signUpbtn">
                    </div>
                </div>
            </div>
            <div className="position-block myBody">
                <span className="sectionTitles"> My Schedule </span>
                <div className="mySchedule">
                    {apptExist ? showAppt() : noAppt()}
                </div>
            </div>
        </div>
    )
}