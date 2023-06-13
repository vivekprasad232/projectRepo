import './Details.css';
import Variables from '../Context/Variable';
import { useContext } from 'react';
const AudioElement=({data})=>{
    for(const elem1 of data){
        for(const elem2 of elem1.phonetics){
            if(elem2.audio!==''){
                return <audio controls src={elem2.audio}></audio>
            }
        }
    }
    return null;
}
const Details=({data,setShowAllCards})=>{
    const {isHistory}=useContext(Variables);
    return(
        <div className={isHistory?"more card":"more"}>
            <h1>{data[0].word}</h1>
            <AudioElement data={data} />
            {data.map((elem1,index)=>(<ul key={index+"elem1"}>
                <li>
                    <h5>{index+1}</h5>
                    {elem1.meanings.map((elem2,index)=>(
                        <ul key={index+"elem2"}>
                            <h4>{elem2.partOfSpeech}</h4>
                            {elem2.synonyms.length!==0 && <div className='sydiv1'>
                                <div className='synow'>synonyms- </div>
                                <div>{elem2.synonyms.join(',')}</div>
                                </div>}
                            {elem2.antonyms.length!==0 && <div className='sydiv1'>
                                <div className='synow'>antonyms- </div>
                                <div>{elem2.antonyms.join(',')}</div>
                                </div>}
                            {elem2.definitions.map((elem3,index)=>(
                                <li key={index+"elem3"}>{elem3.definition}</li>
                            ))}
                        </ul>
                    ))}
                </li>
            </ul>))}
            {isHistory && <button onClick={()=>setShowAllCards(true)}>Back</button>}
        </div>
    );
}
export default Details;