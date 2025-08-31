import React, { useEffect, useRef, useState } from 'react'
import "./ForgotPassword.css"
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from './BaseURL';

function ForgotPassword() {
    const [resetEmail, setresetEmail] = useState("")
    const [resetPassword, setresetPassword] = useState("")
    const [resetRPassword, setresetRPassword] = useState("")
    const [invalidEmail, setinvalidEmail] = useState(false)
    const [invalidPassword, setinvalidPassword] = useState(false)
    const [invalidRePass, setinvalidRePass] = useState(false)
    const [EmailNotExist, setEmailNotExist] = useState(false)
    const [loading, setLoading] = useState(false);
    const isFirst = useRef(true);

    function closelogin() {
        document.querySelector('.forgotcontainer').style.display = 'none'
        document.querySelector('.closearea').style.left = '-1800px';
    }
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return
        }
        validations()
    }, [resetEmail, resetPassword, resetRPassword])

    function validations() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(resetEmail)) {
            setinvalidEmail(true)
        } else {
            setinvalidEmail(false)
        }

        const passregex = /^.{6,}$/;
        if (!passregex.test(resetPassword)) {
            setinvalidPassword(true);
        } else {
            setinvalidPassword(false);
        }

        if (resetPassword != resetRPassword) {
            setinvalidRePass(true)
        } else {
            setinvalidRePass(false)
        }
    }

    function handleReset() {
        setLoading(true)
        validations()
        setTimeout(() => {
            if (!invalidEmail && !invalidPassword && !invalidRePass) {
                fetch(`${BASE_URL}/reset-password`, {
                    method: "PUT",
                    body: JSON.stringify({
                        username: resetEmail,
                        password: resetPassword
                    }),
                    headers: {
                        "Content-Type": "application/json; charset = UTF-8 "
                    }
                }).then(res => {
                    res.status == 500 ? setEmailNotExist(true) : setEmailNotExist(false)
                    res.status == 200 ? resetSuccess() : null
                    return res.json()
                })
                    .then(data => data)
                    .catch(err => err)
                    .finally(() => {
                        setLoading(false)
                        setinvalidEmail(false)
                        setinvalidPassword(false)
                        setinvalidRePass(false)
                    })
            } else {
                setLoading(false)
            }
        }, 300)
    }

    const notify = () => toast(`Password reset successfully !`, {
        style: {
            background: "forestgreen",
            color: "white",
            fontSize: "1.1rem"
        },
        duration: 1500
    });

    function resetSuccess() {
        notify()
        closelogin()
        setresetEmail("")
        setresetPassword("")
        setresetRPassword("")
    }

    return (
        <div>
            <div className="forgotcontainer" >
                {<div className="forgotbox">
                    <div className="closebtnlogin" onClick={closelogin}><i class="bi bi-x"></i></div>
                    <h3>Reset Password</h3>
                    <label htmlFor="emaillogin">Email</label>
                    <input type="email" id='emaillogin' value={resetEmail} onChange={
                        (e) => {
                            setresetEmail(e.target.value)
                            setEmailNotExist(false)
                        }
                    } />
                    {invalidEmail && <p className='invalid mt-2 mb-0'><i class="bi bi-exclamation-circle"></i> Invalid Email</p>}
                    {EmailNotExist && <p className='invalid mt-2 mb-0'><i class="bi bi-exclamation-circle"></i> Email Not exists</p>}
                    <label htmlFor="password">Password</label>
                    <input type="password" id='passwordlogin' value={resetPassword} onChange={
                        (e) => {
                            setresetPassword(e.target.value)
                        }
                    } />
                    {invalidPassword && <p className='invalid mt-2 mb-0'><i class="bi bi-exclamation-circle"></i> Invalid password</p>}
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id='Cpasswordlogin' value={resetRPassword} onChange={
                        (e) => {
                            setresetRPassword(e.target.value)
                        }
                    } />
                    {invalidRePass && <p className='invalid mt-2 mb-0'><i class="bi bi-exclamation-circle"></i> Passwords do not match</p>}
                    {false && <p className='invalidforgot'><i class="bi bi-exclamation-circle"></i> Passwords do not match</p>}
                    <button className='mt-3' onClick={handleReset}>Reset</button>
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

export default ForgotPassword