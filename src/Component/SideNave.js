import React, { useState } from 'react'
import {useHistory} from "react-router-dom";

function SideNave({selectedBtn,setSelectedBtn}) {
  let history = useHistory();
  const [isLogin,setIsLogin] = useState(false);
  useState(()=>{
    if(localStorage.getItem("token"))
    {
      setIsLogin(true);
    }
  },[])

  const handleLogin=()=>{
    history.push('/login');
  }

  const handlelogout=()=>{
    localStorage.removeItem("token");
    history.push('/login');
  }
   
  return (
    <div className="btnsDiv">
    <div className={selectedBtn==1?`btnSelected`:`btnUnSelected`} onClick={(e)=>{setSelectedBtn(1)}}>
    <i class="fa-solid fa-user"></i>
       <p style={{display:"inline"}}> Add Student</p>
    </div>
    <div className={selectedBtn==2?`btnSelected`:`btnUnSelected`} onClick={(e)=>{setSelectedBtn(2)}}>
    <i class="fa-duotone fa-list"></i>
       <p style={{display:"inline"}}>Manage Students</p>
    </div>
    {
      isLogin?
    <div className={selectedBtn==3?`btnSelected`:`btnUnSelected`} onClick={(e)=>{setSelectedBtn(3) 
                                                                                  handlelogout()}}>
    <i class="fa-regular fa-arrow-right-from-bracket"></i>
        <p style={{display:"inline"}}>Logout</p>
    </div>
    :
    <div className={selectedBtn==3?`btnSelected`:`btnUnSelected`} onClick={(e)=>{setSelectedBtn(3)
                                                                                  handleLogin()}}>
    <i class="fa-regular fa-arrow-right-from-bracket"></i>
        <p style={{display:"inline"}}>LogIn</p>
    </div>
    }
    </div>
  )
}
export default SideNave