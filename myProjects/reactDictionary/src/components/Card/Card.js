import './Card.css';

const Card=({data,setHData,setShowAllCards,forRemove,setForRemove})=>{
    function showMore(){
        setHData(data);
        setShowAllCards(false);
    }
    function remove(){
        localStorage.removeItem(data[0].word);
        setForRemove(!forRemove);
    }
    return(
        <div className='more card'>
            <h1>{data[0].word}</h1>
            <div>{data[0].meanings[data[0].meanings.length-1].definitions[0].definition}</div>
            <button onClick={showMore}>Show More</button>
            <button onClick={remove}>Remove</button>
        </div>
    );
}
export default Card;