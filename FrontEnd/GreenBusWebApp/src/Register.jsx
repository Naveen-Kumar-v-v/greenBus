import React, { useEffect, useState } from 'react'
import './Register.css'
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from './BaseURL';

function Register() {

    const [regEmail, setregEmail] = useState("")
    const [regPhonenumber, setregPhonenumber] = useState("")
    const [regFullname, setregFullname] = useState("")
    const [regPassword, setregPassword] = useState("")
    const [regRPassword, setregRPassword] = useState("")
    const [alreadyExist, setAlreadyExist] = useState(false)
    const [invalidEmail, setinvalidEmail] = useState(false)
    const [invalidPhonenumber, setinvalidPhonenumber] = useState(false)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidPassword,setInvalidPassword] = useState(false)
    const [invalidRePass,setinvalidRePass] = useState(false)
    let fill = true

    function closereg() {
        document.querySelector('.regcontainer').style.display = 'none'
        document.querySelector('.closearea').style.left = '-1800px';
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault(); // stop number from changing
        }
    }

    const regNotify = () => toast(`Registration Successful Go to login page to login !`, {
        style: {
            background: "forestgreen",
            color: "white",
            fontSize: "1.1rem"
        },
        duration: 2000
    });

    const fillfun = () => {
        if (regFullname == "" || regPhonenumber == "" || regEmail == "" || regPassword == "" || regRPassword == "") {
            fill = false
        }
    }

    function validations() {
        //Email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(regEmail)) {
            setinvalidEmail(true)
            fill = false
        } else {
            setinvalidEmail(false)
        }

        //Phonenumber validation
        const phregex = /^(\+91[\-\s]?)?[6-9]\d{9}$/
        if (!phregex.test(regPhonenumber)) {
            setinvalidPhonenumber(true)
            fill = false
        } else {
            setinvalidPhonenumber(false)
        }

        const nameregex = /^[A-Za-z ]{2,}$/;
        if (!nameregex.test(regFullname)) {
            setInvalidName(true);
            fill = false;
        } else {
            setInvalidName(false);
        }

        const passregex = /^.{6,}$/;
        if (!passregex.test(regPassword)) {
            setInvalidPassword(true);
            fill = false;
        } else {
            setInvalidPassword(false);
        }

        if(regPassword != regRPassword){
            setinvalidRePass(true)
            fill = false;
        }else{
            setinvalidRePass(false)
        }

    }


    async function register() {
        fillfun()
        validations()

        if (fill) {
            await fetch(`${BASE_URL}/reg`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: regEmail,
                        password: regPassword,
                        fullname: regFullname,
                        phonenumber: regPhonenumber
                    }),
                    headers: {
                        "content-type": "application/json; charset = UTF-8"
                    }
                }).then(res => {
                    res.status == 500 ? setAlreadyExist(true) : null
                    res.status == 200 ? closereg() : null
                    res.status == 200 ? regNotify() : null
                })
                .then(data => data)
                .catch(err => console.log(err))

            if (!alreadyExist) {
                setregEmail("")
                setregFullname("")
                setregPhonenumber("")
                setregPassword("")
                setregRPassword("")
            }
        }
    }

    return (
        <div>
            <div>
                <Toaster />
                <div className="regcontainer" >
                    <div className="regbox">
                        <div className="closebtnreg" onClick={closereg}><i class="bi bi-x"></i></div>
                        <h3>Register to greenBus</h3>
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" id='fullname' value={regFullname} onChange={(e) => {
                            setregFullname(e.target.value)
                            setAlreadyExist(false)
                        }} />
                        {invalidName && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Invalid name</p>}
                        <label htmlFor="pnumber">Phone number</label>
                        <input type="number" id='pnumber' onKeyDown={handleKeyDown} value={regPhonenumber} onChange={(e) => {
                            setregPhonenumber(e.target.value)
                            setAlreadyExist(false)
                        }} />
                        {invalidPhonenumber && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Invalid phone number</p>}
                        <label htmlFor="email">Email</label>
                        <input required type="email" id='email' value={regEmail} onChange={(e) => {
                            setregEmail(e.target.value)
                            setAlreadyExist(false)
                        }} />
                        {invalidEmail && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Invalid email</p>}
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' value={regPassword} onChange={(e) => {
                            setregPassword(e.target.value)
                            setAlreadyExist(false)
                        }} />
                        {invalidPassword && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Password must be atleast 6 characters</p>}
                        <label htmlFor="rpassword">Repeat Password</label>
                        <input type="password" id='rpassword' value={regRPassword} onChange={(e) => {
                            setregRPassword(e.target.value)
                            setAlreadyExist(false)
                        }} />
                        {invalidRePass && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Passwords do not match</p>}
                        {alreadyExist && <p className="alreadyexist"><i class="bi bi-exclamation-circle"></i> Email Already Exists go to login page</p>}
                        {/* {!fill2 && <p className="alreadyexist mt-3"><i class="bi bi-exclamation-circle"></i> Fill all field</p>} */}
                        <button onClick={register}>Register Now</button>
                        <p onClick={closereg}> Already have an account ? <a>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register