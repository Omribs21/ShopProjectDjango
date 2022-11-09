import React, { useState } from 'react'
import { RegisterAsync } from "../Slicers/registerSlice";
import { useDispatch } from "react-redux";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';
import AlertDialogRegister from './Alert';
import { Alert } from '@mui/material';
import CustomizedDialogs from './TermsOfService';
import ContactUs from './ContactUs';
import ReturnPolicy from './ReturnPolicy';


const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    // style={{ width: "520px", height: "400px", backgroundColor: "gainsboro", margin: "auto", padding: "20px", borderRadius: "25px" }}
    return (
        <div style={{ zIndex: "1" }} class="header">
            <div style ={{height:"75px"}}class="inner-header flex">
                <div style={{ width: "520px", height: "550px", backgroundColor: "gainsboro", margin: "auto", marginTop: "2.5%", padding: "20px", borderRadius: "25px" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", rowGap: "15px" }}>
                        <h1 class="animate__animated animate__zoomIn" style={{ width: "100%", fontSize: "70px", color: "black", fontFamily: "monospace" }}>Register</h1>
                        <input class="animate__animated animate__zoomInDown" style={{ width: "60%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='First name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                        <input class="animate__animated animate__zoomInDown" style={{ width: "60%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Last name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                        <input class="animate__animated animate__zoomInDown" style={{ width: "60%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input class="animate__animated animate__zoomInDown" style={{ width: "60%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} type={'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input class="animate__animated animate__zoomInDown" style={{ width: "60%", borderRadius: "10px", margin: "auto", fontSize: "17px", color: "black", blockSize: "50px" }} type={'email'} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button class="animate__animated animate__zoomInDown" style={{ width: "15%", borderRadius: "5px", margin: "auto", fontSize: "17px", color: "white", blockSize: "50px", backgroundColor: "dodgerblue" }} type="button"
                            onClick={
                                () => { dispatch(RegisterAsync({ "username": username, "password": password, "email": email, "first_name": first_name, "last_name": last_name })); }}
                        >

                            <lord-icon
                                src="https://cdn.lordicon.com/egiwmiit.json"
                                trigger="hover"
                                colors="primary:#ffffff">
                            </lord-icon>
                        </button>
                        <Outlet />
                    </div>
                </div>

            </div>
            <div style={{ zIndex: "5"}}>
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "60em" }}></hr>
                <CustomizedDialogs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ContactUs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ReturnPolicy />
            </div>
            <div>
                <svg class="waves" xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Register