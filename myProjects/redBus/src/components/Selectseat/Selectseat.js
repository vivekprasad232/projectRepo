import './Selectseat.css';
import arrow from '../../images/arrow.png'
import bus from '../../images/bus.png'
import React, { useContext } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { variables } from '../context/ApiContext';

const seats1 = [];

for (let i = 1; i <= 16; i++) {
  const seat = {
    id: i,
    number: i,
    available: true,
  };
  seats1.push(seat);
}
const seats2 = [];

for (let i = 17; i <= 24; i++) {
  const seat = {
    id: i,
    number: i,
    available: true,
  };
  seats2.push(seat);
}
function Selectseat(){
    const {isLoggedIn,busDetails,setSeatArr,setIsCameFromList}=useContext(variables);
    const arr=[];
    const navigate=useNavigate();
    function bookTicket(){
        if(arr.length===0) alert('Please Select Seat');
        else {
            if(isLoggedIn){
                setSeatArr(arr);
                navigate('/payment');
            }
            else{
                setSeatArr(arr);
                setIsCameFromList(true);
                navigate('/signin');
            }
        }
    }
    function selectfunc(e){
       const isSelected= e.target.parentNode.classList.toggle('selected');
       if(isSelected) {
        arr.push(e.target.textContent);
       }
       else {
        const indx=arr.indexOf(e.target.textContent);
        arr.splice(indx,1);
       }
    }
    return(<>
        {busDetails ?
    <div id='bckground'>
        <div id='buslistcontainer'>
            <div className="busdetails2" >
                <div className="font">{busDetails.busName}</div>
                <div className="time">
                    <div className="details">DEPARTURE</div>
                    <div className="font">{busDetails.departureTime}</div>
                </div>
                <div className="time">
                    <div className="details">ARRIVAL</div>
                    <div className="font">{busDetails.arrivalTime}</div>
                </div>
                <div className="font">{busDetails.ticketPrice+'/-'}</div>
            </div>
        </div>
        <img src={bus} alt='bus' id='bus' />
        <div id='seatcontainermain'>
            <div id="seatcontainer1">{
            seats1.map((seat)=>(
                <div key={'seat'+seat.id} className={seat.available?"seat":"seat unavailable"}>
                    <div className='soh' onClick={selectfunc}>{seat.number}</div>
                </div>
            ))}</div>
            <div id="seatcontainer2">{
            seats2.map((seat)=>(
                <div key={'seat'+seat.id} className={seat.available?"seat":"seat unavailable"}>
                    <div className='soh' onClick={selectfunc}>{seat.number}</div>
                </div>
            ))}</div>
        </div>
        <img src={arrow} alt='direction' id='arrow' />
        <div id='book-ticket' onClick={bookTicket}><div>BOOK TICKET</div></div>
    </div>
          :<Navigate to={'/'} />  }</>
    );
}
export default Selectseat;