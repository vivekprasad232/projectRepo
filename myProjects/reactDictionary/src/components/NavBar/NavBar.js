import './NavBar.css';
import Variables from '../Context/Variable';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const NavBar=()=>{
    const {isHistory,setIsHistory}=useContext(Variables);
    const navigate=useNavigate();
    function handleClick(){
        if(isHistory){
            setIsHistory(false);
            navigate('/')
        }
        else{
            setIsHistory(true);
            navigate('/history')
        }

    }
    return(
    <nav>
        <ul id="navlist">
            <li>My Dictionary App</li>
            <li id="history" onClick={handleClick}>{isHistory? "SEARCH":"HISTORY"}</li>
        </ul>
    </nav>
    );
}
export default NavBar;