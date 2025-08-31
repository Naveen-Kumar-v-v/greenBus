import React, { useState } from 'react'
import './Login.css'
import toast, { Toaster } from 'react-hot-toast';
import { data, Outlet, useNavigate } from "react-router-dom";
import useUsernameStore from './useUsernameStore';
import { BASE_URL } from './BaseURL';


function Login() {

  const { user, setUsername ,clearUsername , userFullName, setUserFullName ,userPhone ,setUserPhone} = useUsernameStore();
  const route = useNavigate();
  const [inpEmail, setinpEmail] = useState("");
  const [inpPassword, setinpPassword] = useState("");
  const [Invalid, setInvalid] = useState(false);

  let tokenvar = ""

  function closelogin() {
    document.querySelector('.logincontainer').style.display = 'none'
    document.querySelector('.closearea').style.left = '-1800px';
  }
  function triggerregbox() {
    document.querySelector('.regcontainer').style.display = 'flex'
    document.querySelector('.menu-container').style.right = '-1000px';
  }

  function handleForgotPassword(){
        document.querySelector('.forgotcontainer').style.display = 'flex'
  }

  const notify = () => toast(`Login Successful !`, {
    style: {
      background: "forestgreen",
      color: "white",
      fontSize: "1.1rem"
    },
    duration: 1500
  });

  async function login() {
    await fetch(`${BASE_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          username: inpEmail,
          password: inpPassword
        }),
        headers: {
          "content-type": "application/json; charset = UTF-8"
        }
      }
    ).then((response) => {

      response.status == 401 ? setInvalid(true) : closelogin()
      response.status == 401 ? setInvalid(true) : notify()
      response.status == 401 ? setInvalid(true) : setinpEmail("")
      response.status == 401 ? setInvalid(true) : setinpPassword("")
      return response.json()
    })
      .then(data => {
        tokenvar = data.token;
        if (tokenvar != "undefined") {
          localStorage.setItem("token", data.token)
        }
      })
      .catch(err => console.log(err)
      );

    await fetch(`${BASE_URL}/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset = UTF-8 ",
          "Authorization": `Bearer ${tokenvar}`
        }
      })
      .then(res => res.text())
      .then(data2 => {
        if (data2 != "") {
          localStorage.setItem("user", data2)
          setUsername(data2)
        }
        return data2
      })
      .catch(err => console.log(err)
      )

    await fetch(`${BASE_URL}/getuserdetailsByUsername/${localStorage.getItem("user")}`)
      .then(res => res.json())
      .then(data => {
        if (data != null) {
          setUserFullName(data.fullname)
          setUserPhone(data.phonenumber)
          localStorage.setItem("userFullName", data.fullname)
          localStorage.setItem("userPhone", data.phonenumber)
        }
      })
      .catch(err => console.log(err))

  }

  return (
    <div>
      <Toaster />
      <div className="logincontainer" >
        {<div className="loginbox">
          <div className="closebtnlogin" onClick={closelogin}><i class="bi bi-x"></i></div>
          <h3>Login to greenBus</h3>
          <label htmlFor="emaillogin">Email</label>
          <input type="email" id='emaillogin' value={inpEmail} onChange={(e) => {
            setinpEmail(e.target.value)
            setInvalid(false)
          }} />
          <label htmlFor="password">Password</label>
          <input type="password" id='passwordlogin' value={inpPassword} onChange={(e) => {
            setinpPassword(e.target.value)
            setInvalid(false)
          }} />
          <div className="forgot" onClick={handleForgotPassword}>
            <p>Forgot Password ?</p>
          </div>
          {Invalid && <p className='invalid'><i class="bi bi-exclamation-circle"></i> Invalid password or email</p>}
          <button onClick={login}>Login</button>
          <p onClick={triggerregbox}>Don't have an account ? <a>Sign Up</a></p>
        </div>}
      </div>
    </div>
  )
}

export default Login