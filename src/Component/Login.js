import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { login } from '../actions/actions';

export default function Login(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state, "State");
  let history = useHistory();
  const [cred, setCred] = useState({ email: "", password: "" })

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://logobackend.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json();
    console.log(json,"json")
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlret('logged in successfully', 'success')
      history.push("/")
    }
    else {
      props.showAlret('Please try with correct credentials', 'warrning')
    }
    console.log(json)
  }
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
       <p style={{fontWeight:"600",position:"relative",top:"20px",fontSize:"20px"}}>Login</p>
      <h2 className="subHead">Please enter your details</h2>

      <form >
        <div className="form-group">
          <label htmlFor="email" style={{fontWeight:"600",fontSize:"20px"}}>email</label>
          <input type="text" className="form-control inputStyle" id="email" name="email" onChange={onChange} value={cred.email} aria-describedby="emailHelp" placeholder="Type your email here" />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{fontWeight:"600",fontSize:"20px"}}>Password</label>
          <input type="text" className="form-control inputStyle" name="password" onChange={onChange} value={cred.password} id="password" placeholder="Type your password here" />
        </div>
       <div onClick={handleLogin} >
        <div  style={{
          height: "35px", border: "1px solid red",
          textAlign: "center", width: "20%", padding: "5px", borderRadius: "5px",
          fontSize:"14px",fontWeight:"500",color:"white",backgroundColor:"#f33823"
        }}>
        <p className="SubmitDiv">Login</p>
        </div>
        <Link to="/signup" style={{color:"black"}}>
          create new account
      </Link>
       </div>
      </form>
    </>
  )
}
