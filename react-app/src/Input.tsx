import "./App.css";
import Display from "./Display";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import top from "./top.png";
import Swal from 'sweetalert2';

function Input() {
  const navigate = useNavigate();

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [resultDeclarationDate, setResultDeclarationDate] = useState("");
  const [error, setError] = useState(false);
  const [isLoading,setIsloading] = useState(false);

  const searchDegree = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = {
      date: resultDeclarationDate,
      registrationNumber: registrationNumber,
    };

    setIsloading(true)
    const apiUrl = `http://localhost:5500/${registrationNumber}/${resultDeclarationDate}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsloading(false)
        return response.json();
      })
      .then((data) => {
        if(data.error){
          Swal.fire({
            title: 'Opps',
            text: `There is no result in the system for your search !`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000, // Adjust the duration (in milliseconds)
            icon: 'info', // You can change this to 'error', 'warning', 'info', etc.
          });
        }else{
        navigate("/display", { state: data });
        }
        // Handle the response data as needed
      })
      .catch((error) => {
        navigate("/");

        alert("no data found please back to search again");
        console.error("e", error);
      });
  };

  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError">Roll No should have at least 8 characters</p>
    );
  };

  const getIsFormValid = () => {
    return registrationNumber && resultDeclarationDate;
  };

  const clearForm = () => {
    setRegistrationNumber("");
    setResultDeclarationDate("");
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={searchDegree}>
          <fieldset>
            <img src={top} alt="img here" />
            <h2>Online Degree Verification System</h2>
            <div className="Field">
              <label>
                Registration Number <sup>*</sup>
              </label>
              <input
                required
                autoComplete="off"
                value={registrationNumber}
                disabled={isLoading}

                onChange={(e) => {
                  setRegistrationNumber(e.target.value);
                }}
                placeholder="Registration Number"
              />
            </div>

            <div className="Field">
              <label>
                Result Declared on <sup>*</sup>
              </label>
              <input
                value={resultDeclarationDate}
                required
                autoComplete="off"
                type="date"
                disabled={isLoading}
                onChange={(e) => {
                  setResultDeclarationDate(e.target.value);
                }}
              />
            </div>
            { isLoading? 
               <div className="loader-container"> <div className="loader"></div></div>

            :<button type="submit">Search Record</button>
}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Input;
