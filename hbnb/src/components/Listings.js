import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_END_POINT } from './utils/constant';
import Header from './Header';
import Card from './Card';

const Listings = () => {
      const [data,setdata]=useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
           const res = await axios.get(`${API_END_POINT}/data`);
           setdata(res.data);
         }catch (err) {
           console.log(err);
         }
   }

   fetchData()
},[]);
  

   
  return (

   <div>
   <div className="  px-20  grid grid-cols-4 gap-4 card-container">
     {data.map(card => (
       <Card key={card._id} card={card} />
     ))}
   </div>
   <div className='w-[100%] h-0.5 bg-black'>
   </div>
 </div>
  
  )
}

export default Listings




