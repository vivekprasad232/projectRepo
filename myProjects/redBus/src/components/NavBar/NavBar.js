import { useNavigate } from "react-router-dom";
import logoimg from "../../images/rdc-redbus-logo.svg";
import langimg from "../../images/US.webp"
import darrow from "../../images/darrow.png";
import "./NavBar.css";
import { variables } from "../context/ApiContext";
import { useContext } from "react";
function NavBar(){
    const {isLoggedIn,userName,setIsLoggedIn}=useContext(variables);
    const navigate=useNavigate();
    function loginHandle(){
        if(isLoggedIn){
            setIsLoggedIn(false);
            navigate('/');
        }
        else{
            navigate('/signin');
        }
    }
    function handleClick(){
        navigate('/');
    }
    return(
        <nav>
            <div id="nvbr">
                <img src={logoimg} id='redbus_logo' onClick={handleClick} alt="logoimg"/>
                <div className="wraptext"><div className="transfer">Airport Transfers</div></div>
                <div className="corner">
                    <div className="corneritem hlp"><div>Help</div></div>
                    <div className="corneritem"><img className="langimg" src={langimg} alt="langimg" /><img src={darrow} alt="darrow" className="downarrow" /></div>
                    <div className="corneritem"><div>INR</div><img src={darrow} alt="darrow" className="txtarrow" /></div>
                    <div className="corneritem"><div>Manage Booking</div><img src={darrow} alt="darrow" className="txtarrow" /></div>
                    <div id='user' onClick={loginHandle}>{isLoggedIn?<><div>{userName}</div>Logout<div></div></>:"Login"}</div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;