import { useState } from "react";
import { auth } from "../Backend/Firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";


  

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMsg("Please enter your email"); 
      return;
    }

    setErrorMsg("");

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetEmailSent(true);
        alert('Please check your email to confirm your account');
        navigate(-1);

      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <>
    <div>

    </div>
    <div className="auth-body">
    <div className="logincontainer" >
      <form className="loginform"  style={{borderRadius: '10px'}} onSubmit={handleResetPassword} >
        <h5 class="signuphead" style={{marginBottom: '30px'}}>Reset your Password</h5>

        <div class="form-group">
            <input
              type="email"
              id="email"
              value={email}
              className="formcontrol"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label for="email" style={{marginLeft: '5px'}}>College Email address</label>
        </div>
        {errorMsg && <Alert variant="danger" style={{fontSize: '12px'}}>{errorMsg}</Alert>}

        
        <span ><p style={{fontSize: '14px',marginLeft: '10px'}}>Back to <NavLink style={{textDecoration: 'none'}} to ="/student">Log in</NavLink></p></span>

        
        <button type="submit" name="signup" id="signup" className="auth-submit"

        >Send Password Reset Link</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default ForgotPassword;
