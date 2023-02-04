import React, { useState,useEffect } from 'react'
import {useHistory} from "react-router-dom";

function Page1({showAlret}) {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("")
  const [landMark, setLandMark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [today,setToday] = useState("");
  const [month,setmonth] = useState("");
  const [year,setYear] = useState("");
  const now = new Date().toLocaleTimeString();
  const[time,setTime] = useState(now);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  
  setInterval(() => {
      showTime()
      }, 1000);
  
  let showTime =()=>{
  const newTime = new Date().toLocaleTimeString();
  setTime(newTime)
   }
   
  var classArray = ["I", "II", "III","IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

  const handleAddStuden = async () => {
    // console.log(image,'image');
    

    if(firstName!=""&&lastName!=""&&className!=""&&section!=""&&rollNumber!=""&&addressLine1!=""&&addressLine2!=""&&landMark!=""&&city!=""&&pincode!="")
    {
      const data = {
        firstName,
        middleName,
        lastName,
        className,
        section,
        rollNumber,
        addressLine1,
        addressLine2,
        landMark,
        city,
        pincode,
        image
      }
      const response = await fetch(`https://logobackend.onrender.com/api/auth/addStudent`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json, "json")
    console.log(data, "handleAddStuden");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setClassName("");
    setSection("");
    setRollNumber("");
    setAddressLine1("");
    setAddressLine2("");
    setLandMark("");
    setCity("");
    setPinCode("");
  }
  else{
    if(firstName=="")
    {
      showAlret("please enter first name","")
    }
    if(lastName=="")
    {
      showAlret("please enter last name","")
    }
    if(className=="")
    {
      showAlret("please enter class","")
    }
    if(section=="")
    {
      showAlret("please enter section","")
    }
    if(rollNumber=="")
    {
      showAlret("please enter roll number","")
    }
    if(addressLine1=="")
    {
      showAlret("please enter addressLine1","")
    }
    if(addressLine2=="")
    {
      showAlret("please enter addressLine2")
    }
    if(landMark=="")
    {
      showAlret("please enter landMark")
    }
    if(city=="")
    {
      showAlret("please enter city")
    }
    if(pincode=="")
    {
      showAlret("please enter pincode")
    }
    
  }
  }
  
  useEffect(() => {
    let date = new Date();
    setToday(date.getDate());
    setmonth(date.toLocaleString('default', { month: 'short' }));
    setYear(date.getFullYear());
    if(!localStorage.getItem('token'))
    {
      history.push('/login');
    }
    
  }, [])
  
const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    } 
  };

return (
    <div>
     
    <div style={{marginBottom:"32px"}}>
      <p style={{display:"inline",position:"relative",left:"20px",fontSize:"12px",fontWeight:"500"}}>Add Student</p>
      <p style={{display:"inline",position:"absolute",right:"28px",fontSize:"12px",fontWeight:"500"}}>{today}{month}{year}{" "}{time}</p>
    </div>
    
      <div class="container" >
        <div class="row">
          <div class="col-sm" >
            <input type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setFirstName(e.target.value)}
              value={firstName} aria-describedby="emailHelp"
              placeholder="First Name"
               />
          </div>
          <div class="col-sm">
            <input type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setMiddleName(e.target.value)}
              value={middleName} aria-describedby="emailHelp"
              placeholder="Middle Name" />
          </div>
          <div class="col-sm">
            <input type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setLastName(e.target.value)}
              value={lastName} aria-describedby="emailHelp"
              placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row">
          <div class="col-sm">
            <div class="dropdown" >
              <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" 
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
               style={{width:"175px"}}>
                {className} Class
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                {classArray.map((ele) => {
                  return <button class="dropdown-item" type="button" onClick={(e) => { setClassName(ele) }}>{ele} Class</button>
                })}
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" 
              id="dropdownMenu2" data-toggle="dropdown" 
              aria-haspopup="true" aria-expanded="false"
              style={{width:"175px"}}
              >
                {section} Section
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button" onClick={(e) => { setSection("A") }}>A</button>
                <button class="dropdown-item" type="button" onClick={(e) => { setSection("B") }}>B</button>
                <button class="dropdown-item" type="button" onClick={(e) => { setSection("C") }}>C</button>
                <button class="dropdown-item" type="button" onClick={(e) => { setSection("D") }}>D</button>
                <button class="dropdown-item" type="button" onClick={(e) => { setSection("E") }}>E</button>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <input type="number" className="form-control inputStyle" max={2} 
              id="username" name="username" onChange={(e) => (
                e.target.value<100?
                setRollNumber(e.target.value):null)}
              value={rollNumber} aria-describedby="emailHelp"
              placeholder="Roll Number" />
          </div>
        </div>
      </div>

      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row">
          <div class="col-sm-6">
            <textarea type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setAddressLine1(e.target.value)}
              value={addressLine1} aria-describedby="emailHelp"
              placeholder="Address Line 1" />
          </div>
          <div class="col-sm-6">
            <textarea type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setAddressLine2(e.target.value)}
              value={addressLine2} aria-describedby="emailHelp"
              placeholder="Address Line 2" />
          </div>
        </div>
      </div>

      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row">
          <div class="col-sm">
            <input type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setLandMark(e.target.value)}
              value={landMark} aria-describedby="emailHelp"
              placeholder="LandMark" />
          </div>
          <div class="col-sm">
            <input type="text" className="form-control inputStyle"
              id="username" name="username" onChange={(e) => setCity(e.target.value)}
              value={city} aria-describedby="emailHelp"
              placeholder="City" />
          </div>
          <div class="col-sm">
            <input type="number" className="form-control inputStyle"
              id="username" name="username" onChange={(e) =>(
                e.target.value<1000000? setPinCode(e.target.value):null)}
              value={pincode} aria-describedby="emailHelp"
              placeholder="pincode" />
          </div>
        </div>
      </div>

      <div id="pic">
                  <img src={imagePreview} alt="Image Preview" style={{width:"150px",height:"150px"}}/>
                  <input
                    type="file"  name="image" accept="image/*" onChange={onChange}
                  />
                  <p style={{fontSize:"10px"}}>file should be less than 70kb</p>
        </div>
      <div className="addStudentBtn" onClick={handleAddStuden}
        style={{
          margin: "18px", border: "1px solid red",
          textAlign: "center", width: "40%", padding: "5px", borderRadius: "5px",
          fontSize:"14px",fontWeight:"500",color:"white",backgroundColor:"#f33823"
        }} >Add Student</div>
    </div>
  )
}

export default Page1