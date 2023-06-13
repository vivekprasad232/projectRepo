import './Home.css';
import React,{useContext, useEffect,useRef, useState} from 'react';
import heroimage from "../../images/HeroRDC.svg";
import locationimg from "../../images/Location Copy.svg";
import togglebtn from "../../images/toggle.svg";
import m36 from "../../images/36million.svg";
import over5000 from "../../images/3500worldwide.svg"
import ticketsbooked from "../../images/100000-booked-perday.svg";
import adv1 from "../../images/adv1.svg";
import travel from "../../images/Anxiety-free travel.svg";
import chargesfree from "../../images/No hidden charges@3x 1.svg";
import weare from "../../images/weare.jpg";
import nasdaq from "../../images/Nasdaq_RDC.svg";
import partner from "../../images/Partner.svg";
import twentyyrs from "../../images/Twentyyrs.svg";
import List from '../List/List';
import { variables } from '../context/ApiContext';
const sourcearr=[];
const destinationarr=[];
let sourceobj={};
let destinationobj={};
function Home() {
    const {setList,setIsSearched,isSearched,setBusDetails,list}=useContext(variables);
    const date=useRef();
    const [list1,setList1]=useState([]);
    const [list2,setList2]=useState([]);
    const sourceInput=useRef();
    const destinationInput=useRef();
    useEffect(()=>{
      async function func(){
        try{ const res=await fetch('https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses');
        const data=await res.json();
        console.log(data);
        for(const elem of data){
            if(elem.source in sourceobj){
                sourceobj[elem.source]=sourceobj[elem.source].add(elem.destination);
            }
            else {
                const hs=new Set();
                sourceobj[elem.source]=hs.add(elem.destination);
            }
            if(elem.destination in destinationobj){
                destinationobj[elem.destination]=destinationobj[elem.destination].add(elem.source);
            }
            else {
                const hs=new Set();
                destinationobj[elem.destination]=hs.add(elem.source);
            }
            // console.log(elem.source+"   "+elem.destination);
        }
        for(const key in sourceobj){
            sourcearr.push(key);
        }
        for(const key in destinationobj){
            destinationarr.push(key);
        }
        setList1(sourcearr);
        setList2(destinationarr);
      }
      catch(err){
        console.log(err);
      }
    }
    func();
    return ()=>{
      sourcearr.length=0;
      destinationarr.length=0;
      sourceobj={};
      destinationobj={};
    }
    },[]);
    function handleInput(){
      if(sourceInput.current.value in sourceobj){
        const temparr=[];
        for(const el of sourceobj[sourceInput.current.value]){
          temparr.push(el);
        }
        setList2(temparr);
      }
      else if(sourceInput.current.value==='') setList2(destinationarr);
      else setList2([]);
      if(destinationInput.current.value in destinationobj){
        const temparr=[];
        for(const el of destinationobj[destinationInput.current.value]){
          temparr.push(el);
        }
        setList1(temparr);
      }
      else if(destinationInput.current.value==='') setList1(sourcearr);
      else setList1([]);
    }

    async function handlesubmit(e){
      e.preventDefault();
      try{ const re=await fetch(`https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses?source=${sourceInput.current.value.trim()}&destination=${destinationInput.current.value.trim()}`);
      const dt=await re.json();
      const dt2=dt.map(elem=>{
        elem.rating=Math.floor(Math.random()*5+5);
        return elem;
      });
      setList(dt2);
      setIsSearched(true);
      }catch(err){
        console.log(err);
      }
    }
    function exchangeValue(){
      const temp=sourceInput.current.value;
      sourceInput.current.value=destinationInput.current.value;
      destinationInput.current.value=temp;
      handleInput();
    }
    return (
      <div className="Home"> 
      <div>
        <div className='hero-wrapper'>
          <div className='hero-tag-cont'>
            <h1 className='hero-tag'>Book your journey now with the world's largest bus platform</h1>
          </div>
          <img className='hero-image' src={heroimage} alt='heroimage'/>
          <form className='main-wrapper' onSubmit={handlesubmit}>
            <div id='search-div'>
              <div className='search-wrapper'>
                <div className='source input-box'>
                  <label htmlFor='src'>SOURCE</label>
                  <div className='input-area'>
                    <img className='location' src={locationimg} alt='locationimg'/>
                    <div>
                      <input type='text' ref={sourceInput} list='data1' onChange={handleInput} id='src' placeholder='Ex: pune' required />
                      <datalist id='data1'>
                        {list1 && list1.map((elem,key)=><option key={'dat1'+key} value={elem}/>)}
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className='toggle' onClick={exchangeValue}>
                  <img src={togglebtn} alt='toggle' />
                </div>
                <div className='destination input-box'>
                  <label htmlFor='dest'>DESTINATION</label>
                  <div className='input-area'>
                    <img className='location' src={locationimg} alt='locationimg'/>
                    <div>
                      <input type='text' id='dest' ref={destinationInput} list='data2' onChange={handleInput} placeholder='Ex: mumbai' required />
                      <datalist id='data2'>
                        {list2 && list2.map((elem,key)=><option key={'dat2'+key} value={elem}/>)}
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className='grey-vertical'></div>
                <div className='date input-box'>
                  <label htmlFor='date'>DATE</label>
                  <div className='input-area'>
                    <div>
                      <input type='date' id='date' ref={date} required />
                    </div>
                  </div>
                </div>
              </div>
              <button id='searchbtn' type='submit'>SEARCH</button>
            </div>
          </form>
        </div>
      </div>
      {isSearched && <List setBusDetails={setBusDetails} busList={list} setList={setList} />}
      <div className='stats-wrapper'>
        <div className='stats-container'>
          <div className='stats-item'>
            <div className='img-cont'>
              <img src={m36} alt='m36'/>
            </div>
            <div className='item-details1'>36 Million</div>
            <div className='item-details2'>happy customers globally</div>
          </div>
          <div className='stats-item'>
            <div className='img-cont'>
              <img src={over5000} alt='over'/>
            </div>
            <div className='item-details1'>Over 5000</div>
            <div className='item-details2'>bus companies worldwide</div>
          </div>
          <div className='stats-item'>
            <div className='img-cont'>
              <img src={ticketsbooked} alt='ticketbooked'/>
            </div>
            <div className='item-details1'>200,000+</div>
            <div className='item-details2'>tickets booked everyday</div>
          </div>
        </div>
      </div>
      <div className='adv-wrapper'>
        <div className='adv-flexcontainer'>
          <div className='adv-flex'>
            <img className='adv-image' src={adv1} alt='adv1'/>
            <div className='adv-content'>
              <div className='adv-head'>Worldwide coverage</div>
              <div className='adv-desc'>Find affordable travel tickets across the world, all at one place</div>
            </div>
          </div>
          <div className='adv-flex'>
            <img className='adv-image' src={travel} alt='travel'/>
            <div className='adv-content'>
              <div className='adv-head'>Anxiety-free travel</div>
              <div className='adv-desc'>We ensure your information is safe and your travel is hassle free, wherever you go</div>
            </div>
          </div>
          <div className='adv-flex'>
            <img className='adv-image' src={chargesfree} alt='chargesfree'/>
            <div className='adv-content'>
              <div className='adv-head'>No hidden charges</div>
              <div className='adv-desc'>Find the best deals online and guess what, refunds are simple!</div>
            </div>
          </div>
        </div>
      </div>
      <div className='mmt-wrapper'>
        <div className='common-head'>It’s all about travel</div>
        <div className='mmt-container'>
          <div className='mmt-content'>redBus is part of Makemytrip group which has been listed on <b>NASDAQ since 2010</b></div>
          <img className='mmt-image' src={nasdaq} alt='nasdaq' />
        </div>
        <div className='mmt-container'>
          <div className='mmt-content'>We have two partner companies <b>makemytrip.com and goibibo.com</b></div>
          <img className='mmt-image' src={partner} alt='partner' />
        </div>
        <div className='mmt-container'>
          <div className='mmt-content'>Helping people book travel and accommodation for <b>more than 20 years</b></div>
          <img className='mmt-image' src={twentyyrs} alt='twentyyrs' />
        </div>
      </div>
      <div>
        <img className='weare-img' src={weare} alt='weare' />
        <div className='weare-wrapper'>
          <div className='weare-head'>We are about bus travel</div>
          <div className='weare-para'>
          redBus is the best platform in the world for booking bus tickets online. redBus is serving 6 countries around the world
           (India, Malaysia, Singapore, Indonesia, Peru, and Colombia), and would be launching bus ticket booking services in more 
           countries. Trusted by over 18 million customers worldwide, redBus offers an easy, fast, and secure platform for booking 
           cheap bus tickets. You only need to select your origin, destination, and date of departure, and you will find plenty of 
           buses to travel by within a few seconds. You can book bus based on your preferred schedule, choose a pick-up and dropping 
           point, preferred bus type, and book a bus ticket online with just a few clicks!
          </div>
          <div className='weare-para'>
          redBus operates on over 7000 routes and has on-boarded over 2,300 bus operators globally. In addition to bus tickets booking
           for popular tourist destinations, one can also book cheap bus tickets to the remote and less popular places in India, 
           Malaysia, Singapore, Indonesia, Peru, and Colombia through redBus. redBus has sold over 180 million tickets globally through 
           its website and mobile app, ensuring hassle-free and memorable experience for booking bus tickets online.
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Home;