import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function SignUp() {

  const [cred, setCred] = useState({ name: "", email: "", password: "" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://logobackend.onrender.com/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password})
    });
  const json = await response.json();
    if (json.success) {
      alert("done credentials")
      localStorage.setItem('token', json.authtoken);
      history.push("/");
    }
    else {
      alert("Invalid credentials")
    }
    console.log(json)
  }

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Link to="/login">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </Link>
      <p style={{fontWeight:"600",position:"relative",top:"20px",fontSize:"20px"}}>Create account</p>
      <h2 className="subHead">Let's get to know you better!</h2>
      <form >

        <div className="form-group">
          <label htmlFor="name" className="labels">Your name</label>
          <input type="text" className="form-control inputStyle" id="name" name="name" onChange={onChange} value={cred.name} aria-describedby="emailHelp" placeholder="Type your name here" />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="labels">Email address</label>
          <input type="email" className="form-control   inputStyle" id="email" name="email" onChange={onChange} value={cred.email} aria-describedby="emailHelp" placeholder="Type your email here" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="labels">Password</label>
          <input type="text" className="form-control    inputStyle" name="password" onChange={onChange} value={cred.password} id="password" placeholder="Type your password here" />
        </div>
      <div style={{
          height: "35px", border: "1px solid red",
          textAlign: "center", width: "20%", padding: "5px", borderRadius: "5px",
          fontSize:"14px",fontWeight:"500",color:"white",backgroundColor:"#f33823"
        }}
      onClick={handleSubmit}>
        <p  className="SubmitDiv">Register</p>
        </div>
      </form>
    </>
  )
}