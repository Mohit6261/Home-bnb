import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_END_POINT } from './utils/constant'
import CardFavList from './CardFavList';
import Header from './Header';

const FavouriteListing = () => {
    const [result,setresult]=useState([]);
   useEffect(() => {
      const showfavourite = async() => {
          try{
            const listing=await axios.get(`${API_END_POINT}/data`);
            const ans=listing.data.filter(listing => listing.favourite.length === 1);
            setresult(ans);
          }catch(err){
             console.log(err);
          }
      }
      showfavourite();
   },[])
  return (
    <div>
         <Header/>
         <div className="  px-20  grid grid-cols-1  gap-4 card-container">
             {result.map(result => (
             <CardFavList key={result._id} result={result} />
             ))}
       </div>
    </div>
  )
}

export default FavouriteListing