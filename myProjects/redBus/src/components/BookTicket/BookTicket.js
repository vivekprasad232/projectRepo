import './BookTicket.css';
import success from '../../images/success.png'
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { variables } from '../context/ApiContext';
function BookTicket(){
    const {seatArr,busDetails}=useContext(variables);
    const navigate=useNavigate();
    const [isPaid,setIsPaid]=useState(false);
    const [carderr,setCarderr]=useState(false);
    const [cvverr,setCvverr]=useState(false);
    function payfunc(e){
        e.preventDefault();
        setCarderr(false);
        setCvverr(false);
        let flag=true;
        if(e.target.cardno.value.length!==16){
            flag=false;
            setCarderr(true);
        }
        if(e.target.cvv.value.length!==3){
            flag=false;
            setCvverr(true);
        }
        if(flag){
            setIsPaid(true);
            const tmout=setTimeout(() => {
                clearTimeout(tmout);
                navigate('/');
            }, 5000);
        }
    }
    return(!isPaid ?
        <> 
            { seatArr.length>0 ? <>
            <h1 id='payheading'>PAYMENT</h1>
            <div id='detailsandpaycontainer'>
                <div className='detailsandpay detailschckout'>
                    <h2 className='pt'>PAYMENT DETAILS</h2>
                    <div className='details-item'>
                        <div className='detalis-left'>BUS NAME</div>
                        <div className='details-right'>{busDetails.busName}</div>
                    </div>
                    <div className='details-item'>
                        <div className='detalis-left'>SEAT NO.</div>
                        <div className='details-right'>{seatArr.join(',')}</div>
                    </div>
                    <div className='details-item'>
                        <div className='detalis-left'>TOTAL FARE</div>
                        <div className='details-right'>{busDetails.ticketPrice*seatArr.length}</div>
                    </div>
                </div>
                <form className='detailsandpay pay' onSubmit={payfunc}>
                    <h2 className='pt'>PAYMENT METHODE</h2>
                    <div>
                        <label>NAME</label>
                        <input name='name' type={'text'} required />
                    </div>
                    <div>
                        <label>EMAIL</label>
                        <input name='email' type={'email'} required />
                    </div>
                    <div>
                        <label>CARD NO.</label>
                        <input name='cardno' type={'number'} required />
                        {carderr && <p className='err'>Invalid cardno.</p>}
                    </div>
                    <div>
                        <label>EXPIRY</label>
                        <input name='expiry' type={'month'} required />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input name='cvv' type={'password'} required />
                        {cvverr && <p className='err'>Invalid cvv</p>}
                    </div>
                    <button>PAY</button>
                </form>
            </div>
            </>
           :<Navigate to={'/'} /> }
        </>
    :<img id='successful' src={success} alt='success' />);
}
export default BookTicket;