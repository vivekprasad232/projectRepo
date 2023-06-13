import './Signup.css';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import signupimg from "../../images/signup.png";

const Signup = () => {
  const navigate=useNavigate();
  const [nameError,setNameError]=useState(false);
  const [emailError,setEmailError]=useState(false);
  const [passwordError,setPasswordError]=useState(false);
  function validation(e){
    let flag=true;
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    if(e.target.username.value===''){
      setNameError(true);
      flag=false;
    }
    if(e.target.email.value===''){
      setEmailError(true);
      flag=false
    }
    if(e.target.password.value.length<4){
      setPasswordError(true);
      flag=false;
    }
    const obj={
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    e.target.username.value='';
    e.target.email.value='';
    e.target.password.value='';
    if(flag) {
      localStorage.setItem(obj.email,JSON.stringify(obj));
      navigate('/signin');
    }
  }
  return (
    <div className='cntnr'>
    <div id="main">
      <form className='frm' onSubmit={validation}>
        <img src={signupimg} alt='signupimg' />
        <h1>Sign Up</h1>
        <section>
          <label>Username</label>
          <input className='frmelem' type="text" name='username' />
          {nameError && (<p className='username-error'>Fill the name</p>) }
          <label>Email</label>
          <input className='frmelem' type="email" name='email' />
          {emailError && (<p className='email-error'>Invalid Email</p>)}
          <label>Password</label>
          <input className='frmelem' type="password" name='password' />
          {passwordError && (<p className='password-error'>Password must have more than 4 characters</p>)}
          <button className='frmelem' type='submit'>Submit</button>
        </section>
        <Link to={'/signin'}>Already have an account? Sign in</Link>
      </form>
    </div>
    </div>
  )
}


export default Signup;

