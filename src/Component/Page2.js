import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

function Page2() {

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
  const [id, setId] = useState("");
  const [pincode, setPinCode] = useState("");
  var classArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [update, setUpdate] = useState(true);
  const [today, setToday] = useState("");
  const [month, setmonth] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  const [load,setLoad] = useState(true);

  const getAllStudents = async () => {
    const response = await fetch(`https://logobackend.onrender.com/api/auth/getAllStudent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setAllStudents(json.allStudents);
    console.log(json, "json");
    setLoad(false);
  }

  const [allStudents, setAllStudents] = useState([]);
  // cosnt [removeStd,setRemoveStd] = useState('');

  const handleRemoveStudent = async () => {
    // alert(id);
    const response = await fetch(`https://logobackend.onrender.com/api/auth/removeStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ id: id })
    });

    const json = await response.json();
    console.log(json, "json")
    getAllStudents();
  }

  useEffect(() => {
    getAllStudents();
    let date = new Date();
    setToday(date.getDate());
    setmonth(date.toLocaleString('default', { month: 'short' }));
    setYear(date.getFullYear());
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
  }, [])

  const handleSaveChanges = async () => {
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
      id
    }
    const response = await fetch(`https://logobackend.onrender.com/api/auth/updateStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    console.log(json, "json");
    getAllStudents();
  }

  const viewData = (ele) => {
    setUpdate(true);
    setFirstName(ele.firstName);
    setMiddleName(ele.middleName);
    setLastName(ele.lastName);
    setClassName(ele.className);
    setRollNumber(ele.rollNumber);
    setSection(ele.section);
    setAddressLine1(ele.addressLine1);
    setAddressLine2(ele.addressLine2);
    setLandMark(ele.landMark);
    setCity(ele.city);
    setPinCode(ele.pincode);
    setId(ele._id);
    setImage(ele?.image?.url);
  }

  const setData = (ele) => {
    setUpdate(false);
    console.log("data", ele);
    setFirstName(ele.firstName);
    setMiddleName(ele.middleName);
    setLastName(ele.lastName);
    setClassName(ele.className);
    setRollNumber(ele.rollNumber);
    setSection(ele.section);
    setAddressLine1(ele.addressLine1);
    setAddressLine2(ele.addressLine2);
    setLandMark(ele.landMark);
    setCity(ele.city);
    setPinCode(ele.pincode);
    setId(ele._id);
    setImage(ele?.image?.url);
    console.log(ele?.image?.url, "%ima")
  }

  const setYes = () => {
    handleRemoveStudent()
  }

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
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
      >
        <div class="modal-dialog" role="document" style={{ width: "800px", marginRight: "440px" }}>
          <div class="modal-content" style={{ width: "800px" }}>
            <div class="modal-header">
              <img src={image} style={{ height: "60px" }} />
              <h5 class="modal-title" id="exampleModalLabel" style={{ position: "relative", top: "12px" }}>Student Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div class="container" >
                <div class="row">
                  <div class="col-sm" >
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setFirstName(e.target.value)}
                      value={firstName} aria-describedby="emailHelp"
                      placeholder="First Name"
                      disabled={update}
                    />
                  </div>
                  <div class="col-sm">
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setMiddleName(e.target.value)}
                      value={middleName} aria-describedby="emailHelp"
                      placeholder="Middle Name" disabled={update} />
                  </div>
                  <div class="col-sm">
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setLastName(e.target.value)}
                      value={lastName} aria-describedby="emailHelp"
                      placeholder="Last Name" disabled={update} />
                  </div>
                </div>
              </div>
              <div class="container" style={{ marginTop: "20px" }}>
                <div class="row">
                  <div class="col-sm">
                    <div class="dropdown" >
                      <button class="btn dropdown-toggle" type="button" id="dropdownMenu2"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        style={{ width: "175px" }} disabled={update}>
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
                        style={{ width: "175px" }} disabled={update}
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
                    <input type="text" min={2} className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => (
                        e.target.value < 100 ?
                          setRollNumber(e.target.value) : null)}
                      value={rollNumber} aria-describedby="emailHelp"
                      placeholder="Roll Number" disabled={update} />
                  </div>
                </div>
              </div>

              <div class="container" style={{ marginTop: "20px" }}>
                <div class="row">
                  <div class="col-sm-6">
                    <textarea type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setAddressLine1(e.target.value)}
                      value={addressLine1} aria-describedby="emailHelp"
                      placeholder="Address Line 1" disabled={update} />
                  </div>
                  <div class="col-sm-6">
                    <textarea type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setAddressLine2(e.target.value)}
                      value={addressLine2} aria-describedby="emailHelp"
                      placeholder="Address Line 2" disabled={update} />
                  </div>
                </div>
              </div>

              <div class="container" style={{ marginTop: "20px" }}>
                <div class="row">
                  <div class="col-sm">
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setLandMark(e.target.value)}
                      value={landMark} aria-describedby="emailHelp"
                      placeholder="LandMark" disabled={update} />
                  </div>
                  <div class="col-sm">
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => setCity(e.target.value)}
                      value={city} aria-describedby="emailHelp"
                      placeholder="City" disabled={update} />
                  </div>
                  <div class="col-sm">
                    <input type="text" className="form-control inputStyle"
                      id="username" name="username" onChange={(e) => (
                        e.target.value < 1000000 ? setPinCode(e.target.value) : null)}
                      value={pincode} aria-describedby="emailHelp"
                      placeholder="pincode" disabled={update} />
                  </div>

                </div>
                <div id="pic">
                  <img src={imagePreview} alt="Image Preview" style={{width:"150px",height:"150px"}}/>
                  <input
                    type="file"  name="image" accept="image/*" onChange={onChange}
                  />
                  <p style={{fontSize:"10px"}}>file should be less than 70kb</p>
            </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn " style={{ backgroundColor: "#f33823", color: "white", fontWeight: 500 }} data-dismiss="modal" disabled={update} onClick={handleSaveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModa2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">

            <div class="modal-body">
              Do you want to remove  student with roll number {rollNumber}
            </div>
            <button className="btn" onClick={setYes} data-dismiss="modal">yes</button><button className="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ display: "inline", position: "relative", left: "20px", fontSize: "12px", fontWeight: "500" }}>Manage Student</p>
        <p style={{ display: "inline", position: "absolute", right: "28px", fontSize: "12px", fontWeight: "500" }}>{today}{month}{year}{" "}{time}</p>
      </div>

      <div style={{ height: "350px", overflowY: "auto" }}>
        <table class="table table-striped"
        >
          <thead style={{ backgroundColor: "#f33823", color: "white" }}>
            <tr  >
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Roll Number</th>
              <th scope="col">view/edit/delete</th>
            </tr>
          </thead>
          <tbody>
          {load?<h1>Loading .. </h1>:
          
            allStudents.map(ele => {
              console.log(ele, "ele");
              return <tr>
                <td >{ele.firstName}{" "}{ele.middleName}{" "}{ele.lastName}</td>
                <td>{ele.className}{"-"}{ele.section}</td>
                <td>{ele.rollNumber}</td>
                <td>
                  <i class="fa-solid fa-eye" data-toggle="modal" data-target="#exampleModal" onClick={(e) => viewData(ele)}></i>

                  <i class="fa-solid fa-pen" data-toggle="modal" data-target="#exampleModal" onClick={(e) => setData(ele)}></i>
                  <i class="fa-solid fa-trash" data-toggle='modal' data-target="#exampleModa2" onClick={(e) => setData(ele)}></i>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page2