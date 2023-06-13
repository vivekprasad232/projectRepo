import React, { useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import nobus from "../../images/no_buses_found_image.svg"
import './List.css';
import { variables } from "../context/ApiContext";

function List(){
    const {list,setList,setBusDetails}=useContext(variables);
    const [srtbyDeparture,setSrtbyDeparture]=useState("ascending");
    const [srtbyArrival,setSrtbyArrival]=useState("ascending");
    const [srtbyPrice,setSrtbyPrice]=useState("ascending");
    const navigate=useNavigate();
    function calculateSec(str){
        if(str.length===7){
            const hh=parseInt(str.substring(0,2))*3600;
            const mm=parseInt(str.substring(3,5))*60;
            let hd=0;
            if(str.substring(5,7)==='PM' && hh!==12) hd=43200;
            return hh+mm+hd;
        }
        else{
            const hh=parseInt(str.substring(0,1))*3600;
            const mm=parseInt(str.substring(2,4))*60;
            let hd=0;
            if(str.substring(4,6)==='PM' && hh!==12) hd=43200;
            return hh+mm+hd;
        }
    }
    function sortByDeparture(){
        const sortedList=[...list];
        if(srtbyDeparture==="ascending"){
            sortedList.sort((a,b)=>calculateSec(a.departureTime)-calculateSec(b.departureTime));
            setList(sortedList);
            setSrtbyDeparture("descending");
        }
        else{
            sortedList.sort((a,b)=>calculateSec(b.departureTime)-calculateSec(a.departureTime));
            setList(sortedList);
            setSrtbyDeparture("ascending");
        }
        setSrtbyArrival("ascending");
        setSrtbyPrice("ascending");
    }
    function sortByArrival(){
        const sortedList=[...list];
        if(srtbyArrival==="ascending"){
            sortedList.sort((a,b)=>calculateSec(a.arrivalTime)-calculateSec(b.arrivalTime));
            setList(sortedList);
            setSrtbyArrival("descending");
        }
        else{
            sortedList.sort((a,b)=>calculateSec(b.arrivalTime)-calculateSec(a.arrivalTime));
            setList(sortedList);
            setSrtbyArrival("ascending");
        }
        setSrtbyDeparture("ascending");
        setSrtbyPrice("ascending");
    }
    function sortByPrice(){
        const sortedList=[...list];
        if(srtbyPrice==="ascending"){
            sortedList.sort((a,b)=>a.ticketPrice-b.ticketPrice);
            setList(sortedList);
            setSrtbyPrice("descending");
        }
        else{
            sortedList.sort((a,b)=>b.ticketPrice-a.ticketPrice);
            setList(sortedList);
            setSrtbyPrice("ascending");
        }
        setSrtbyArrival("ascending");
        setSrtbyDeparture("ascending");
    }
    function view(index){
        setBusDetails(list[index]);
        navigate('/seatmenu');
    }
    return(
        <div id='buslistcontainer1'>
        {list.length>0 ?<>
            <div className="sortby">
                <div className="srt">SORT BY: </div>
                <div onClick={sortByDeparture} className="sortbtn">Departure</div>
                <div onClick={sortByArrival} className="sortbtn">Arrival</div>
                <div onClick={sortByPrice} className="sortbtn">Price</div>
            </div>
        {list.map((elem,key)=>(
            <div key={'bus'+key} className="busdetails" >
                <div className="font">{elem.busName}</div>
                <div className="time">
                    <div className="details">DEPARTURE</div>
                    <div className="font">{elem.departureTime}</div>
                </div>
                <div className="time">
                    <div className="details">ARRIVAL</div>
                    <div className="font">{elem.arrivalTime}</div>
                </div>
                <div className="font rating">{elem.rating}/10</div>
                <div className="font">{elem.ticketPrice+'/-'}</div>
                <button className="viewsts" onClick={()=>{view(key)}}>View seats</button>
            </div>
        ))}</> : (<img className="notfound" src={nobus} alt="nobus" />)}
        </div>
    );
}
export default List;