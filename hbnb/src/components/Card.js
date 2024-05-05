import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_END_POINT } from './utils/constant';
import { useGlobal } from './GlobalContext';
import { FaHeart } from "react-icons/fa";


const Card = ({ card }) => {
   // const [isFavourite, setIsFavourite] = useState(false);
    const [liked,setliked]=useState(false);
    const { globalValue } = useGlobal(); 
    const navigate=useNavigate();
    // useEffect(() => {
    //     // Load favorite status from local storage if available
    //     const savedFavorite = localStorage.getItem('favorite_' + card._id);
    //     if (savedFavorite) {
    //         setIsFavourite(JSON.parse(savedFavorite));
    //     }
    // }, [card._id]);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            if(globalValue==true){
                try {
                    const result = await axios.get(`${API_END_POINT}/${card._id}/checkfavourite`);
                    console.log(result.data.favourite.length);
                    if (result.data.favourite.length === 1) {
                        setliked(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            
        };

        fetchFavoriteStatus(); // Fetch favorite status when component mounts
    }, []); 

    const toggleFavorite = async (e) => {
        e.preventDefault();
       // const liked = !isFavourite;
       // setIsFavourite(liked);
        // Save favorite status to local storage
       // localStorage.setItem('favorite_' + card._id, JSON.stringify(newFavorite));
      if(globalValue==true){
        try{
            const res=await axios.post(`${API_END_POINT}/${card._id}/favouritebackend`,{liked:!liked},{
              headers:{
                 "Content-Type":"application/json",
              },
              withCredentials:true,});
              console.log(res);
            if(res.data.success){
               toast.success(res.data.message);
               if(res.data.message==="Favourite Listing removed"){
                  setliked(false);
               }
               else{
                  setliked(true);
               }
            }
  
          }catch(err){
            console.log(err);
          }    
      }
      else{
         navigate("/login");
      }
       
     };

     

  return (
   
    <div className="w-full ">  
      <div style={{ position: 'relative', display: 'inline-block'}}>
        
        <Link to={`/card/${card._id}`} className="block">  
            <img className="w-80  h-60 rounded-t-lg" src={card.image} alt="Your Image" />
           </Link>   
        </div>
        
    
    <div className="p-5">
        <span className='flex justify-between'>
            <h5 className="mb-1 font-bold text-black dark:text-white">{card.title}</h5>
            <span> &#9733; {card.rating}</span>
        </span>
      
        <span >
            <h5 className="mb-0.5 text-black tracking-tight dark:text-white">{card.location}</h5>
        </span>
        
        <span >
            <h5 className="mb-0.5  text-black dark:text-white">{card.country}</h5>
        </span>

       
        <span className='flex items-center justify-between'>
            <h5 className="mb-0.5  mr-4 text-black dark:text-white">&#x20B9;{card.price.toLocaleString("en-IN")} night</h5>
            <div className='hover:bg-red-300 rounded-full p-2'>
                   
            <FaHeart className='' onClick={toggleFavorite}
                icon={IoIosHeartEmpty}
                style={{
                    color: liked ? 'red' : 'black', // Change color based on liked state
                    fontSize: '1.5em',
                    cursor: "pointer",
                }}
            />

            </div>
            
        </span>

        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
        <a  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a> */}
    </div>
    </div>
    
 
  );
};

export default Card;