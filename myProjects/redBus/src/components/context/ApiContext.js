import { createContext,useState } from "react";

const variables=createContext();

function ApiContext(props){
    const [seatArr,setSeatArr]=useState([]);
    const [busDetails,setBusDetails]=useState();
    const [list,setList]=useState([]);
    const [isSearched,setIsSearched]=useState(false);
    const [userName,setUserName]=useState("");
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [isCameFromList,setIsCameFromList]=useState(false);
    const obj={
        seatArr,setSeatArr,busDetails,setBusDetails,list,setList,isSearched,setIsSearched,
        userName,setUserName,isLoggedIn,setIsLoggedIn,isCameFromList,setIsCameFromList
    }
    return(
        <variables.Provider value={obj}>
            {props.children}
        </variables.Provider>
    )
}

export default ApiContext;
export {variables};