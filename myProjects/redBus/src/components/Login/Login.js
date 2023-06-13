import './Login.css';
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../images/login.png";
import { variables } from '../context/ApiContext';
function Login() {
    const {setIsLoggedIn,isCameFromList,setIsCameFromList,setUserName}=useContext(variables);
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isIncorrect,setIsIncorrect]=useState(false);
    function handleClick(e) {
        e.preventDefault();
        setIsIncorrect(false);
        const data=JSON.parse(localStorage.getItem(email));
        if(data==null){
            setIsIncorrect(true);
        }
        else if (email === data.email && password === data.password) {
            setIsLoggedIn(true);
            setUserName(data.name.split(' ')[0]);
            if(isCameFromList){
                setIsCameFromList(false);
                navigate('/payment');
            }
            else {
                navigate('/');
            }
        }
        else setIsIncorrect(true);
    }

    return (
        <div id='container'>
            <form id="loginForm">
                <img src={loginimg} alt='loginimg'/>
                {isIncorrect && (<div className='incorrect-alert'>Incorrect username/password</div>)}
                <label htmlFor="username">Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button id="submit" onClick={handleClick}>
                    Login
                </button>
                <Link to={'/signup'}>New User ? Sign Up</Link>
            </form>
           
        </div>
    );
}

export default Login;