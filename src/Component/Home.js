import React, { useContext, useEffect, useState } from 'react'
import Alert from './Alert';
import Pages from "./Pages"
import { Link } from "react-router-dom"
import SideNave from './SideNave';
export default function Home({showAlret}) {
    const [selectedBtn,setSelectedBtn] = useState(1);
    const [user,setUser] = useState({});

    const getUser=async()=>{
        const response = await fetch(`https://logobackend.onrender.com/api/auth/getuser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
          });
      
          const json = await response.json();
          console.log(json, "user");
          setUser(json.user);
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <>
            <div>
            <h1 style={{display:"inline",color:"rgb(132 120 120)",fontWeight:"bold"}}>LOGO</h1>
            <div style={{display:"inline",position:"absolute",right:"92px",border:"1px solid #efefef",paddingLeft:"40px",paddingRight:"40px",height:"24px",fontSize:"12px"}} ><i class="fa-solid fa-user" style={{display:"inline-block"}}></i> <p  style={{display:"inline-block"}}>{user?.email}</p></div>
                <div class="row">
                    <div class="col-sm-4">
                        <SideNave selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn}/> 
                    </div>
                    <div class="col-sm-8">
                        <Pages selectedBtn={selectedBtn} showAlret={showAlret}/>
                    </div>
                </div>
            </div>
        </>
    )
}