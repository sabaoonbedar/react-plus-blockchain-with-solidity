import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import top from "./top.png";
import axios from "axios";
import SignUp from "./SignUp";
import Swal from 'sweetalert2';

function CreateUser() {
  const navigate = useNavigate();
  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError">Password should have at least 8 characters</p>
    );
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [isLoading,setIsloading] = useState(false);

  const getIsFormValid = () => {
    return email && password;
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsloading(true);

  // Define the request data
  const requestData = {
    username:username,
    email:email,
    password:password,
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json', 
    },
  };
  // Make the POST request using the custom Axios configuration
  axios.post('http://localhost:5500/registerUser', requestData, axiosConfig)
    .then((res) => {
      if (res.data.message === 'success') {
        setIsloading(false);
        Swal.fire({
          title: 'success',
          text: `User registered successfully!`,
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
        });
setUsername('');
setPassword('');
setEmail('');


      } else {
        setIsloading(false);
        
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <img src={top} alt="img here" />
            <h2 className="login">Create a new User</h2>
            <div className="Field2">
              <label>
                Name <sup>*</sup>
              </label>
              <input
                type="username"
                value={username}
                style={{marginLeft:'37px', width:'70%'}}
required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter username"
              />
            </div>
            <div className="Field2" style={{paddingTop:'12px'}}>
              <label>
                Email <sup>*</sup>
              </label>
              <input
                type="email"
                value={email}
                style={{marginLeft:'39px', width:'70%'}}
required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter email"
              />
            </div>

            <div className="Field2" style={{paddingTop:'12px'}}>
              <label>
                Password <sup>*</sup>
              </label>
              <input
                type="password"
                required
                value={password}
                style={{marginLeft:'12px',width:'70%'}}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
              />
            </div>
            <div style={{paddingTop:'32px'}}></div>
            { isLoading?       
             <div className="loader-container"> <div className="loader"></div></div>
:<button className="login-btn" type="submit">
              Create User
            </button>}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default CreateUser;
