import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import top from "./top.png";
import axios from "axios";
import SignUp from "./SignUp";
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError">Password should have at least 8 characters</p>
    );
  };

  const [email, setEmail] = useState("");
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
    email:email,
    password:password,
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json', 
    },
  };
  // Make the POST request using the custom Axios configuration
  axios.post('http://localhost:5500/loginCheck', requestData, axiosConfig)
    .then((res) => {
      if (res.data.message === 'success') {
        localStorage.setItem('userData', JSON.stringify(res.data.data));
        localStorage.setItem('auth', JSON.stringify({isAuthenticated:true}));

        setIsloading(false);

navigate('/');
window.location.reload();

      } else {
        setIsloading(false);
        Swal.fire({
          title: 'Opps',
          text: `The Credentials doesn't match in our database!`,
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000, // Adjust the duration (in milliseconds)
          icon: 'warning', // You can change this to 'error', 'warning', 'info', etc.
        });
        console.log(res)
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
            <h2 className="login">Sign In</h2>
            <div className="Field2">
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
              Login
            </button>}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default Login;
