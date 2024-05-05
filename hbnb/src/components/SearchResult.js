import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';
import Header from "./Header.js";
import Footer from "./Footer.js";

const SearchResult = () => {
    const search = useSelector((store) => store.search);
    console.log(1);
    console.log(search.search);
    const card=search.search;
  return (
    <>
    <Header/>
    <div>
    <div className=" m-2 px-20  grid grid-cols-4  gap-4 card-container">
    
      {card.length>0 &&  card.map(card => (
        <Card key={card._id} card={card} />
      ))}
    </div>
    <div className='w-[100%] h-0.5 bg-black'>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default SearchResult