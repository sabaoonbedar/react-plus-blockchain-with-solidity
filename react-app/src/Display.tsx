import top from "./top.png";
import App from "./App";
import "./Display.css";
import { useNavigate,useLocation } from "react-router-dom";

function Display() {
  const location = useLocation();
  const navigate = useNavigate();
  const clicked = () => {
    navigate("/");
  };

  return (
    <div className="App">
      {" "}
      <div className="container2" style={{width:'80vw'}}>
      
          <img src={top} alt="img here" />
          <h2>Online Degree Verification System</h2>
         

          <table id="customers">
  <tr>
    <th>Reg No</th>
    <th>Serial No</th>
    <th>Name</th>
    <th>Declaration Date</th>
    <th>S/O or D/O</th>
    <th>Session</th>


  </tr>
<tr>
<td>{location.state.reg_no}</td>
<td>{location.state.serial_no}</td>

  <td>{location.state.name}</td>
  <td>{location.state.dec_date}</td>
  <td>{location.state.father_name}</td>

  <td>{location.state.session}</td>



</tr>
  
 
</table>
<div style={{padding:'12px'}}>

</div>

          <button onClick={clicked} type="submit">
            Back
          </button>
   
      </div>
    </div>
  );
}
export default Display;
