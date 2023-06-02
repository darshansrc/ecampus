import { useState } from "react";
import './Student.css'
import { NavLink , useNavigate} from "react-router-dom";
import { auth, firestore } from "../../Backend/Firebase/firebase";
import { ErrorMessage } from "../../MiscComponents/ErrorMessage";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-bootstrap";


const Signup = () => {

 
    const navigate = useNavigate();
    const [values, setValues] = useState({
      name: "",
      email: "",
      pass: "",
      usn: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
    const handleSubmission = () => {
      if (!values.name || !values.email || !values.pass || !values.usn) {
        setErrorMsg("Fill all fields");
        return;
      }
      setErrorMsg("");
  
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
          });
          await sendEmailVerification(user);
  
          const userDocRef = doc(firestore, "users", user.uid);
          await setDoc(userDocRef, {
            name: values.name,
            usn: values.usn,
            email: values.email,
            type: "student"
          });
  
          setSubmitButtonDisabled(false);
          alert('Please check your email to confirm your account');
          
          navigate("/student");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
    };

  return (
    <div className="auth-body">
    <div className="logincontainer" >
      <form className="loginform"  style={{borderRadius: '10px'}} method="POST">
        <h5 class="signuphead" style={{marginBottom: '30px'}}>Sign up to your Student Account</h5>
        <div class="form-group">
          <input type="text" class="formcontrol" name="name" id="name" autoComplete="off"
             value={values.name}
             onChange={(e) =>
               setValues({ ...values, name: e.target.value })
             }
          required/>
          <label for="name" style={{marginLeft: '5px'}}>Enter your name</label>
        </div>
        <div class="form-group">
          <input type="text" class="formcontrol" name='usn' id="usn" autoComplete="off"
            value={values.usn}
            onChange={(e) =>
              setValues({ ...values, usn: e.target.value })
            }
          required/>
          <label for="usn" style={{marginLeft: '5px'}}>Enter your USN</label>
        </div>
        <div class="form-group">
          <input type="text" class="formcontrol" name='email' id="email"  autoComplete="off" 
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, email: e.target.value })
            }
          required/>
          <label for="email" style={{marginLeft: '5px'}}>College Email address</label>
        </div>
        <div class="form-group">
          <input type="password" class="formcontrol" name='password' id="password" autoComplete="off"
            value={values.pass}
            onChange={(e) =>
              setValues({ ...values, pass: e.target.value })
            }
          required/>
          <label for="password" style={{marginLeft: '5px'}}>Choose your Password</label>
   

        </div>
     
        {errorMsg && <Alert variant="danger" style={{fontSize: '12px'}}>{errorMsg}</Alert>}
        
        <span ><p style={{fontSize: '14px',marginLeft: '10px'}}>Already have an account? <NavLink style={{textDecoration: 'none'}} to ="/student">Log in</NavLink></p></span>
        
        <button type="submit" name="signup" id="signup" className="auth-submit"         onClick={handleSubmission}

        disabled={submitButtonDisabled}>Sign Up</button>
      </form>
    </div>
    </div>
  )
}

export default Signup
