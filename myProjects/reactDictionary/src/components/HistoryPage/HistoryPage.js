import './HistoryPage.css';
import Card from '../Card/Card';
import Details from '../Details/Details';
import { useState } from 'react';
const HistoryPage=()=>{
    const [hData,setHData]=useState();
    const [showAllCards,setShowAllCards]=useState(true);
    const [forRemove,setForRemove]=useState(false);
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    return(
        <section>
            {showAllCards && (Object.keys(localStorage).length>0 ? <div id='cards'>{Object.keys(localStorage).map((elem,index)=>{
                if(isJsonString(localStorage[elem])) return <Card forRemove={forRemove} setForRemove={setForRemove} key={index+"elemcard"} setShowAllCards={setShowAllCards} setHData={setHData} data={JSON.parse(localStorage[elem])} />
                else return null
            })}</div>:<div className='empty'>History is empty</div>)}
        <div id='details'>
            {!showAllCards && <Details setShowAllCards={setShowAllCards} data={hData}/>}
        </div>
        </section>
    );
}
export default HistoryPage;