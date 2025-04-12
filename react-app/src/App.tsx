import Display from "./Display";
import Input from "./Input";
import { 
  BrowserRouter,
   Routes,
   Route,  
    Navigate,
    Link,
    useNavigate,
} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { useEffect, useState } from "react";


function App() {
  const authInfo = localStorage.getItem("auth");
  const userInfo = localStorage.getItem("userData");
  const userData = userInfo ? JSON.parse(userInfo) : null;

  const authData = authInfo ? JSON.parse(authInfo) : null;



const logout=()=>{
  localStorage.setItem('auth', JSON.stringify({isAuthenticated:false}));
  localStorage.removeItem("userData");
  window.location.reload();
}



  return (

    <div>
      

      <BrowserRouter>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authData?.isAuthenticated?'':

        <li>
          <Link to="/login">Admin Panel</Link>
        </li>
        }
      
        {authData?authData?.isAuthenticated?
<>
        <li>
          <Link to="/signup">Add Degree Info</Link>
        </li>
        <li>
          <Link to="/createUser">Create Admin</Link>
        </li>
        <li className="nav-item dropdown">
          <span className="dropdown-button">{userData[0]?.username}</span>
          <div className="dropdown-content">
            <li onClick={logout}>Logout</li>
          </div>
        </li>
        </>
       :'' :''}
      </ul>
    </nav>

        <Routes>
        <Route path="*" element={authData?.isAuthenticated?<Navigate to="/"/>:<Navigate to="/"/>} />

          <Route path="/" index element={<Input />} />
          <Route path="/signup" element={authData?.isAuthenticated ? <SignUp />: <Navigate to="/login" />} />
          <Route path="/login" element={authData?.isAuthenticated? <Navigate to="/"/>:<Login/>} />
          <Route path="/createUser" element={authData?.isAuthenticated? <CreateUser/>:<Navigate to="/"/>} />


          <Route path="/display" element={<Display />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
