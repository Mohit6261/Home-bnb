import React, {  useState } from 'react';
import { useGlobal } from './GlobalContext';
import { useNavigate } from 'react-router-dom';
import { API_END_POINT } from './utils/constant';
import axios from "axios";
import toast from 'react-hot-toast';
import Footer from './Footer';
   
  
 
 
const NewListing =  () => {
   const { globalValue } = useGlobal(); 
   const [title,settitle]=useState("");
   const [description,setdescription]=useState("");
   const [image,setimage]=useState("");
   const [price,setprice]=useState("");
   const [location,setlocation]=useState("");
   const [country,setcountry]=useState("");
   const [Hostname,setHostname]=useState("");
   const navigate=useNavigate();


   const userHandler =async (e) => {
        e.preventDefault();
        console.log(globalValue);
        if (globalValue==false) {
          navigate("/login");
        }
        else{
          try{
             const res=await axios.post(`${API_END_POINT}/newlistings`,{title,description,image,price,location,country,Hostname},{
               headers:{
                  "Content-Type":"application/json",
               },
               withCredentials:true,
             })

             if(res && res.data && res.data.success){
               toast.success(res.data.message);
             }
             navigate("/");
          }catch(err){
             console.log(err);
          }
        }  
   }
  return (
   <>
    <div>
       <h1 className='mt-2 text-3xl font-bold text-center'>Home-BnB it with simple setup</h1>
       <img src='https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq'></img>
       <div className='flex p-5'>
          <div className='p-4 overflow-hidden '>
              <h2 className='font-bold'>One-to-one guidance from a Superhost</h2>
              <p>We’ll match you with a Superhost in your area, who’ll guide you from your first question to your first guest – by phone, video call or chat.</p>
          </div>
          <div className='p-4 overflow-hidden'>
              <h2 className='font-bold'>An experienced guest for your first booking</h2>
              <p>For your first booking, you can choose to welcome an experienced guest who has at least three stays and a good track record on Airbnb.</p>
          </div>
          <div className='p-4 overflow-hidden'>
             <h2 className='font-bold'>Specialised support from Airbnb</h2>
             <p>New Hosts get one-tap access to specially trained Community Support agents who can help with everything from account issues to billing support.</p>
          </div>
       </div>
    </div>
    <div className='flex items-center justify-center justify-center h-screen bg-transparent bg-gray-200'>
    <div className=' w-[60%] h-[70%] border-2 border-black  rounded-md bg-white'>
    <form onSubmit={userHandler}>
      <div className='rounded-md p-2 border-x-red-600 m-5 border-2'>
          <input value={title} onChange={(e) => settitle(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Enter title for your home' />
      </div> 
      <div className='rounded-md border-x-red-600 m-5 border-2 p-2 '>
         <input value={description} onChange={(e) => setdescription(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Enter description for your home' />
      </div>
      <div className='rounded-md border-x-red-600 m-5 border-2 p-2'>
         <input value={image} onChange={(e) => setimage(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Enter Image Url' />
      </div>
      <div className='rounded-md border-x-red-600 m-5 border-2 p-2'>
         <input value={location} onChange={(e) => setlocation(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Enter city' />
      </div>
      <div className='rounded-md border-x-red-600 m-5 border-2 p-2'>
         <input value={country} onChange={(e) => setcountry(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Enter Country' />
      </div>
      <div className=' rounded-md border-x-red-600 m-5 border-2 p-2'>
         <input value={price} onChange={(e) => setprice(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='One night visit price' />
      </div>
      <div className=' rounded-md border-x-red-600 m-5 border-2 p-2'>
         <input value={Hostname} onChange={(e) => setHostname(e.target.value)} className='outline-none font-semibold w-[100%]' type="text" placeholder='Host name' />
      </div>
      <div className='flex m-5 justify-center '>
      <button type="submit" className='  p-2 bg-red-600 text-white rounded-md'>Welcome to airbnb host</button>
      </div>
    </form>
    </div>
  </div>
   <Footer/>
  </>  
  )
}

export default NewListing