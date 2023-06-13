
import { useState } from 'react';
import './Home.css';
import HomePageCard from '../HomePageCard/HomePageCard';
import Details from '../Details/Details';
import dictionaryimg from '../images/dictionaryimg.png'
const Home=()=>{
    const [data,setData]=useState();
    const [selectOne,setSelectone]=useState("none");
    // const [isSearched,setIsSearched]=useState(false);
    async function fetchApi(word){
        try{const res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const tempdata=await res.json();
        // console.log(data);
        if("title" in tempdata) setSelectone("not found");
        else setSelectone("found");
        // setIsSearched(true);
        setData(tempdata);
        }
        catch(error){
            console.log(error);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        if(e.target.search.value.trim()===''){
            return;
        }
        fetchApi(e.target.search.value.trim());
    }
    return(
    <section>
        <div id="searchPage">
            <form id="searchForm" onSubmit={handleSubmit}>
                <input type="text" id="search" name="search" placeholder="Search the word"/>
                <button type="submit">Search</button>
            </form>
            <div id="card">
                {selectOne==="found" && <HomePageCard data={data} setSelectone={setSelectone} /> }
                {selectOne==="not found" && <div className='nfound'>not found</div>}
                {selectOne==="show more" && <Details data={data} />}
                {selectOne==="none" && <img className='dictionaryimg' src={dictionaryimg} alt='dictionaryimg'/>}
            </div>
        </div>
    </section>
    );
}
export default Home;