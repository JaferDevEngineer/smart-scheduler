import { useState } from "react"
import { useNavigate } from "react-router-dom";

import '../../src/pagetStyles/LogInPage.css'
import { logInUser } from "../services/Apis";
import smartSchedulerLogo from "../assests/new png logo (1).png"

const ProviderLogInPage = () =>{

    const navigate = useNavigate();
    const [password ,setPassword] = useState('');
    
    const [email ,setEmail] = useState('');
    const [error ,setError] = useState('');

    const handlesubmit = async (e)=>{
        e.preventDefault();
        setError('');
        try{

            const response = await logInUser(email,password);
            localStorage.setItem("jwtToken", response.token);

        navigate('/DashBoard')
        }catch(error){
            setError(error.message);

            console.log(`error${error}`)

        }

    }
    return (
      <div className="logIn-container">
        <div className="logIn-box">
            {/* <h1 className="logo">Smart Scheduler</h1> */}
            <img src={smartSchedulerLogo} alt="Smart Scheduler Logo" className="logo-img" />
          {/* <h2>Log In</h2> */} 
          <h2 className="welcome-text">Welcome Back Chief👋</h2>
        <p className="subtitle">Log in to schedule smartly</p>
          {error && <p className="error-text"> {error}</p>}
          <form onSubmit={handlesubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LogIn</button>
            <div className="footer-text">
                Don't have an account <span onClick={()=>navigate('/provider/register')}> Register</span>

            </div>
          </form>
        </div>
      </div>
    );
}
export default ProviderLogInPage;