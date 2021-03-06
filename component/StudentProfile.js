import React , { Component } from 'react';
import { Button } from "react-bootstrap";
import { logOut } from "./HomePage";
import "../css/HomePage.css";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: null,
            student_fname: null,
            student_lname: null,
            student_email: null,
            student_password: null,
        }
    }

    componentDidMount() {
        const link = "http://localhost:8080/student/"  + sessionStorage.getItem("id").toString();
        fetch(link)
            .then(res => res.json())
            .then(data => {this.setState(data)})
    }

    render() {
        return (
            <div className="homeWrapper">
                <div className="sidebar position-block">
                    <div className="sidebar-wrapper">
                        <div className="logo">
                            <a className="simple-text">AppointMeet</a>
                        </div>
                        <ul className="nav">
                            <li>
                                <a className="nav-link" href="/home">
                                    <i className="nc-icon nc-chart-pie-35"/>
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/home/profile">
                                    <i className="nc-icon nc-circle-09"/>
                                    <p>User Profile</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="">
                                    <i className="nc-icon nc-pin-3"/>
                                    <p>Maps</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="">
                                    <i className="nc-icon nc-bell-55"/>
                                    <p>Notifications</p>
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
                    <span className="sectionTitles"> Student Info </span>
                    <div className="mySchedule">
                        <p>
                            <label>ID: {this.state.student_id}</label><br/>
                            <label>Name: {this.state.student_fname} {this.state.student_lname}</label><br/>
                            <label>Email: {this.state.student_email}</label><br/>
                        </p>
                        <Button variant="info" href="/home/profile/edit">Change password</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentProfile