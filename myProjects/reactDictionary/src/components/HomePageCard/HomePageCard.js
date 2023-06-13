import './HomePageCard.css';
const HomePageCard=({data,setSelectone})=>{
    localStorage.setItem(data[0].word,JSON.stringify(data));
    return(
        <div className="more">
            <h1>{data[0].word}</h1>
            <div>{data[0].meanings[data[0].meanings.length-1].definitions[0].definition}</div>
            <button onClick={()=>setSelectone("show more")}>Show More</button>
        </div>
    );
}
export default HomePageCard;