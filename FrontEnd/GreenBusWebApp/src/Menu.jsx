import React, { useState, useEffect } from 'react'
import './Menu.css'
import useUsernameStore from './useUsernameStore';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseURL';

function Menu() {

    const route = useNavigate()
    let token = localStorage.getItem("token");

    const { user, setUsername, clearUsername, userFullName, setUserFullName, userPhone, setUserPhone } = useUsernameStore();

    const usermenuname = useUsernameStore((state) => state.username);
    const usermenuFname = useUsernameStore((state) => state.userFullName);
    const usermenuPhone = useUsernameStore((state) => state.userPhone);

    const [loading, setLoading] = useState(false);
    const [loggedin, setloggedin] = useState(false);
    const [editName, seteditName] = useState(usermenuFname)
    const [editMail, seteditMail] = useState(usermenuname)
    const [editPhone, seteditPhone] = useState(usermenuPhone)
    const [invalidEmail, setinvalidEmail] = useState(false)
    const [invalidPhonenumber, setinvalidPhonenumber] = useState(false)
    const [invalidName, setInvalidName] = useState(false)

    const notify = () => toast(`Logout Successful !`, {
        style: {
            background: "crimson",
            color: "white",
            fontSize: "1.1rem"
        },
        duration: 1500
    });
    const notifyUpdate = () => toast(`Profile updated Successfully !`, {
        style: {
            background: "forestgreen",
            color: "white",
            fontSize: "1.1rem"
        },
        duration: 1500
    });
    function handleCloseMenu() {
        document.querySelector('.menu-container').style.right = '-1000px';
        document.querySelector('.closearea').style.left = '-1800px';
        document.querySelector('.menu-mobile').style.right = '-1000px'
        CLoseEdit()
    }
    function CLoseEdit() {
        const details = document.querySelector(".details");
        const personalInfo = document.querySelector(".personalinfo");
        const editPencil = document.querySelector(".editpencil");

        if (!usermenuname) {
            document.querySelector(".loginalert").style.display = "none"
            editPencil.style.display = "none";
            personalInfo.style.borderRadius = "5px 5px 5px 5px";
            return
        };
        details.style.transform = "scaleY(0)";
        personalInfo.style.background = "";
        personalInfo.style.borderRadius = "5px 5px 5px 5px";
        editPencil.style.display = "none";
    }
    function triggerloginbox() {
        document.querySelector('.logincontainer').style.display = 'flex'
        document.querySelector('.menu-container').style.right = '-1000px';
    }
    function triggerregbox() {
        document.querySelector('.regcontainer').style.display = 'flex'
        document.querySelector('.menu-container').style.right = '-1000px';
    }
    function handleBookingsClick() {
        route("/bookings")
    }
    function handlePersonalInfoClick() {
        seteditName(usermenuFname)
        seteditMail(usermenuname)
        seteditPhone(usermenuPhone)
        const details = document.querySelector(".details");
        const personalInfo = document.querySelector(".personalinfo");
        const editPencil = document.querySelector(".editpencil");

        if (!usermenuname) {

            if (getComputedStyle(document.querySelector(".loginalert")).display === "none") {
                document.querySelector(".loginalert").style.display = "block"
            } else {
                document.querySelector(".loginalert").style.display = "none"
            }
            editPencil.style.display = "none";
            personalInfo.style.borderRadius = "5px 5px 5px 5px";
            return
        };

        const currentTransform = getComputedStyle(details).transform;

        if (currentTransform === "matrix(1, 0, 0, 0, 0, 0)") {
            details.style.transform = "scaleY(1)";
            personalInfo.style.background = "rgb(210, 205, 205)";
            personalInfo.style.borderRadius = "5px 5px 0 0";
            editPencil.style.display = "inline";
        } else {
            details.style.transform = "scaleY(0)";
            personalInfo.style.background = "";
            personalInfo.style.borderRadius = "5px 5px 5px 5px";
            editPencil.style.display = "none";
        }
        handleCancelEdit()
    }
    function logout() {
        CLoseEdit()
        setUsername(null)
        setUserFullName(null)
        setUserPhone(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("userFullName")
        localStorage.removeItem("userPhone")
        notify()
        seteditName(null)
        seteditMail(null)
        seteditPhone(null)
    }
    function handleEditPencilCick() {
        const inputs = document.querySelectorAll(".personalinforinputs")

        inputs.forEach(element => {
            element.disabled = false;
        })

        document.querySelector(".savebtn").style.display = "flex"

    }
    function handleCancelEdit() {
        const inputs = document.querySelectorAll(".personalinforinputs")

        inputs.forEach(element => {
            element.disabled = true;
        })

        document.querySelector(".savebtn").style.display = "none"
        seteditName(usermenuFname)
        seteditMail(usermenuname)
        seteditPhone(usermenuPhone)
        setErrorOutline()
    }
    function setErrorOutline() {
        const fields = [
            { invalid: invalidName, index: "nameedit" },
            { invalid: invalidEmail, index: "mailedit" },
            { invalid: invalidPhonenumber, index: "phoneedit" }
        ];

        fields.forEach(({ invalid, index }) => {
            const input = document.querySelector(`.${index}`);
            input.style.border = "0";
        });
    }

    async function handleSaveEdit() {
        setLoading(true);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(editMail)) {
            document.querySelector(".mailedit").style.border = "1px solid red"
        } else {
            document.querySelector(".mailedit").style.border = "0"
        }

        const phregex = /^(\+91[\-\s]?)?[6-9]\d{9}$/
        if (!phregex.test(editPhone)) {
            document.querySelector(".phoneedit").style.border = "1px solid red"
        } else {
            document.querySelector(".phoneedit").style.border = "0"
        }

        const nameregex = /^[A-Za-z ]{2,}$/;
        if (!nameregex.test(editName)) {
            document.querySelector(".nameedit").style.border = "1px solid red"
        } else {
            document.querySelector(".nameedit").style.border = "0"
        }
        if (!nameregex.test(editName) || !phregex.test(editPhone) || !regex.test(editMail)) {
            return
        }

        await fetch(`${BASE_URL}/updateUser/${usermenuname}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json; charset = UTF-8"
            },
            body: JSON.stringify({
                fullname: editName,
                phonenumber: editPhone,
                username: editMail,
            })
        }).then(res => {
            res.status == 200 ? notifyUpdate() : null
            res.json()
            return res
        })
            .then(data => data)
            .catch(err => console.log(err))

        fetch(`${BASE_URL}/api/bookings/updateUsername/${usermenuname}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json; charset = UTF-8"
            },
            body: JSON.stringify({
                username: editMail,
            })
        }).then(res => {
            res.json()
            return res
        })
            .then(data => data)
            .catch(err => console.log(err))


        setUserFullName(editName)
        setUserPhone(editPhone)
        setUsername(editMail)
        setLoading(false)
        const inputs = document.querySelectorAll(".personalinforinputs")
        inputs.forEach(element => {
            element.disabled = true;
        })
        document.querySelector(".savebtn").style.display = "none"
    }

    function validations() {
        //Email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(editMail)) {
            setinvalidEmail(true)
        } else {
            setinvalidEmail(false)
        }

        //Phonenumber validation
        const phregex = /^(\+91[\-\s]?)?[6-9]\d{9}$/
        if (!phregex.test(editPhone)) {
            setinvalidPhonenumber(true)
        } else {
            setinvalidPhonenumber(false)
        }

        const nameregex = /^[A-Za-z ]{2,}$/;
        if (!nameregex.test(editName)) {
            setInvalidName(true);
        } else {
            setInvalidName(false);
        }

        if (!invalidEmail || !invalidName || !invalidPhonenumber) {
            return false
        } else {
            return true
        }

    }
    return (
        
        <div className='menu-bg w-100 h-100'>
            <div className="closearea" onClick={handleCloseMenu}></div>
            <div className="menu-container right-0">
                <div className="closebtn" onClick={handleCloseMenu}><i class="bi bi-x"></i> </div>
                <div className="head">Account</div>
                {usermenuname == null && <div className="logindiv">
                    <div className="logintext">Login to Pick up where you left off </div>
                    <button onClick={triggerloginbox}>Login</button>
                    <p onClick={triggerregbox}>Don't have an account ? <a>Sign Up</a></p>
                </div>}
                {usermenuname != null && <div className="loggedinuser">
                    <div className="profilepic"><i class="bi bi-person-circle"></i></div>
                    <div className="username fw-bold">{usermenuFname}</div>
                    <div className="username">{usermenuname}</div>
                    <div><button onClick={logout}>Logout</button></div>
                </div>}
                <div className="personaldetails">
                    <div className="head">Personal Details</div>
                    <div className="bodypd">
                        <div className="bookings-menu" onClick={handleBookingsClick}><i class="bi bi-briefcase"></i>My bookings</div>
                        <div className="personalinfo">
                            <div className="personalinfoinner" onClick={handlePersonalInfoClick}>
                                <div><i class="bi bi-person-badge"></i></div>
                                <div>Personal information</div>
                            </div>
                            <div className='editpencildiv'>
                                <i class="editpencil bi bi-pencil" onClick={handleEditPencilCick} ></i>
                            </div>
                        </div>
                    </div>
                </div>
                {usermenuname != null && <div className="personalinfopannel">
                    <div className="details">
                        <label htmlFor="menuname">Name</label>
                        <input className='personalinforinputs nameedit' type="text" value={editName} onChange={(e) => {
                            seteditName(e.target.value)
                        }} disabled />
                        <label htmlFor="menumail">Email</label>
                        <input className='personalinforinputs mailedit' type="text" value={editMail} onChange={(e) => {
                            seteditMail(e.target.value)
                        }} disabled />
                        <label htmlFor="menuphone">Mobile number</label>
                        <input className='personalinforinputs phoneedit' type="text" value={editPhone} onChange={(e) => {
                            seteditPhone(e.target.value)
                        }} disabled />
                        <div className="savebtn">
                            <button onClick={handleCancelEdit}>Cancel</button><button onClick={handleSaveEdit}>Save</button>
                        </div>
                    </div>
                </div>}
                {usermenuname == null && <div className="loginalert">
                    <p><i class="bi bi-exclamation-circle"></i> Login to to your details</p>
                </div>}
            </div>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Please wait...</p>
                </div>
            )}
        </div>
    )
}

export default Menu