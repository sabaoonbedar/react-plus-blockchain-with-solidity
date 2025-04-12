import React,{useState} from "react";
import "./SignUp.css";
import logo from "./top.png";
import Swal from 'sweetalert2';
import {useNavigate,Link } from "react-router-dom";

const SignUp: React.FC = () => {
const [registrationData,setRegistrationData] = useState({name:'',father_name:'',reg_no:'',serial_no:'',dec_date:'',session:''})
const [isLoading,setIsloading] = useState(false);
const navigate = useNavigate();

const inputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
setRegistrationData({...registrationData,[e.target.name]:e.target.value});
}


  const searchDegree = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = {
      name:registrationData.name,
      father_name:registrationData.father_name,
      reg_no:registrationData.reg_no,
      serial_no:registrationData.serial_no,
      dec_date:registrationData.dec_date,
      session:registrationData.session
    };

    const apiUrl = `http://localhost:5500`;
setIsloading(true)

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if((data.success)){
          // navigate("/");
        // console.log(data);


setRegistrationData({...registrationData,name:'',father_name:'',reg_no:'',serial_no:'',dec_date:'',session:''});


        Swal.fire({
          title: 'Success',
          text: `The degree information of ${registrationData.name} has been successfully submitted`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000, // Adjust the duration (in milliseconds)
          icon: 'success', // You can change this to 'error', 'warning', 'info', etc.
        });
        }
setIsloading(false)
        // Handle the response data as needed
      })
      .catch((error) => {
        alert("no data found please back to search again");
        console.error("e", error);
      });
  };

  



  return (
    <div className="App">

      <div className="FormContainer">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2 id="h2"> Online Degree Verification System</h2>
        <form onSubmit={searchDegree}>
          <div className="Row">
            <div className="FormFieldset">
              <label htmlFor="name" className="FormLabel">
                Enter Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="FormInput"
                onChange={(e)=>{inputChange(e)}}
                disabled={isLoading}
                value={registrationData.name}

                required
              />
            </div>
            <div className="FormFieldset">
              <label htmlFor="fatherName" className="FormLabel">
                Father Name
              </label>
              <input
                type="text"
                id="fatherName"
                className="FormInput"
                name="father_name"
                onChange={(e)=>{inputChange(e)}}
                disabled={isLoading}
                value={registrationData.father_name}


                required
              />
            </div>
          </div>
          <div className="Row">
            <div className="FormFieldset">
              <label htmlFor="registrationNumber" className="FormLabel">
                Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="reg_no"
                className="FormInput"
                onChange={(e)=>{inputChange(e)}}
                disabled={isLoading}
                value={registrationData.reg_no}

                required
              />
            </div>
            <div className="FormFieldset">
              <label htmlFor="serialNumber" className="FormLabel">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serial_no"
                className="FormInput"
                onChange={(e)=>{inputChange(e)}}
                disabled={isLoading}
                value={registrationData.serial_no}

                required
              />
            </div>
          </div>
          <div className="Row">
            <div className="FormFieldset">
              <label htmlFor="declarationDate" className="FormLabel">
                Result Declared on
              </label>
              <input
                type="date"
                id="declarationDate"
                name="dec_date"
                className="FormInput"
                onChange={(e)=>{inputChange(e)}}
                disabled={isLoading}
                value={registrationData.dec_date}


                required
              />
            </div>
            <div className="FormFieldset">
              <label htmlFor="declarationDate" className="FormLabel" style={{paddingRight:'12px'}}>
                Session
              </label>
              <input
                 type="text"
                 id="session"
                 name="session"
                 className="FormInput"
                 onChange={(e)=>{inputChange(e)}}
                 disabled={isLoading}
                 value={registrationData.session}

                required
              />
            </div>
            
          </div>
          <div className="Row">
           { isLoading ?
         
         
      <div className="loader-container"> <div className="loader"></div></div>
            
            
            :
             <button id="b1" type="submit">
            Submit 
          </button>}

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
