import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_END_POINT } from './utils/constant'
import {  useParams } from 'react-router-dom'
import Header from './Header'
import toast from 'react-hot-toast'
import { useGlobal } from './GlobalContext';
import { useNavigate } from 'react-router-dom';
import Map from './Map.js'
import Footer from './Footer.js'
import SocialShare from './SocialShare.js';
import '../rating.css';
import {useDispatch, useSelector} from "react-redux";
import store from "../redux/store";
import { setUser } from "../redux/userSlice";



const CardDetail = () => {
    const {id}=useParams();
    const { globalValue } = useGlobal(); 
    const [card,setcard]=useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [value, onChange] = useState(new Date());
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysDifference, setDaysDifference] = useState(null);
    const [guests,setGuestCount]=useState(null);
    const [rating,setrating]=useState(0);
    const [comments,setcomments]=useState(null);
    const [review,setreview]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
  const user= useSelector((store) => store.app.user);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGuestCount = (event) => {
    setGuestCount(event.target.value);
  }
   

  const calculateDays = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      console.error('Invalid date entered');
      return;
    }
    const differenceInMilliseconds = Math.abs(endDateObj - startDateObj);
    const daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    setDaysDifference(daysDifference);
  };

  // const initPayment =(data) => {
  //      const options={
  //           key:"rzp_test_4bVDPQuyFctVOu",
  //           amount:data.amount,
  //           currency:data.currency,
  //           title:card.title,
  //           description:"Test Transaction",
  //           image:card.image,
  //           order_id:data.id,
  //           handler:async(response) => {
  //               try{
  //                 const verifyUrl=`${API_END_POINT}/verify`;
  //                 const {data} =await axios.post(verifyUrl,response);
  //                 console.log(data);
  //               }catch(err){
  //                console.log(err);
  //               }
  //           },
  //           theme:{
  //             color:"#3399cc",
  //           }
  //      };
  //      const rzp1=new window.Razorpay({options});
  //      rzp1.open();
  // }

  // const makePayment = async () => {
   
  //        try{
  //          const orderUrl = `${API_END_POINT}/orders`;
  //          console.log(card.price);
  //          const {data} = await axios.post(orderUrl,{amount:card.price});
  //          console.log(data);
  //          initPayment(data.data);
  //        }catch(err){
  //           console.log(err);
  //        }
  // };
    

  const initPayment = async (data) => {
    const options={
        key:"rzp_test_4bVDPQuyFctVOu",
        amount: data.amount,
        currency: data.currency,
        name: card.title,
        description: "Test Transaction",
        image: card.image,
        order_id: data.id,
        handler: async (response) => {
            try {
                const verifyUrl = `${API_END_POINT}/verify`;
                const { data } = await axios.post(verifyUrl, response);
                console.log(data);
                
            } catch (err) {
                console.log(err);
            }
        },
        theme: {
            color: "#3399cc",
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

// const Booking = async () => {
//   try {
//       const response = await axios.post(`${API_END_POINT}/listings/${card._id}/availability`, {
//           startDate: startDate,
//           endDate: endDate
//       });
//     console.log(response.data);
//   } catch (error) {
//       console.error('Error checking booking:', error);
//   }
// };

const checkBooking = async () => {
  try {
      const response = await axios.get(`${API_END_POINT}/listings/${card._id}/chkavailable`, {
        params: {
          startDate: startDate,
          endDate: endDate
      },
      headers: {
          "Content-Type": "application/json"
      },
      withCredentials: true});

      console.log(response.data);
    if(response.data.success){
        toast.success(response.data.message);
    }
    if(!response.data.success){
        toast.error(response.data.message);
    }
  } catch (error) {
      console.error('Error checking booking:', error);
  }
};



const postReview = async(e) => {
       e.preventDefault();
       try{
          const res=await axios.post(`${API_END_POINT}/${card._id}/review`,{rating,comments},{
            headers:{
               "Content-Type":"application/json",
            },
            withCredentials:true,});
            
          if(res.data.success){
             toast.success(res.data.message);
          }
          window.location.reload();

       }catch(err){
          console.log(err);
       }
}
const makePayment = async () => {

  const Booking = async () => {
    try {
        const response = await axios.post(`${API_END_POINT}/listings/${card._id}/availability`, {
            startDate: startDate,
            endDate: endDate
        });
      console.log(response.data.listing);
      if(response.data.success){
         toast.success(response.data.message);
         navigate("/bookings",{ state: { listing: response.data.listing } });
      }
    } catch (error) {
        console.error('Error checking booking:', error);
    }
  };

    try {
        const orderUrl = `${API_END_POINT}/orders`;
        const totalAmount = daysDifference * card.price * guests;
        const { data } = await axios.post(orderUrl, { amount: totalAmount });
        console.log(data);
        initPayment(data.data);
        console.log("booked");
        Booking();
    } catch (err) {
        console.log(err);
    }
 
    
      
  
     
    
   
};
    


    useEffect(() => {
        const fetchData = async () => {
           try {
             const res = await axios.get(`${API_END_POINT}/cards/${id}`);
             console.log(res.data);
             setcard(res.data);
           }catch (err) {
             console.log(err);
           }
     } 
     fetchData()
  },[id]);

  if (!card) {
    return null;
}

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8 px-4 py-8">
      <div className="max-w-3xl  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
         <div className='flex justify-between items-center'>
           <h2 className="text-xl mb-2 font-bold text-gray-800">{card.title}</h2>
            <SocialShare/>
        </div>
        <div className="relative pb-64 overflow-hidden">
           <img className="absolute inset-0 h-full w-full object-cover" src={card.image} alt="card-img" /> 
        </div>
        <div className="px-6 py-4">
          {/* <h2 className="text-xl font-bold text-gray-800">{card.title}</h2> */}
          <p className="text-gray-700 font-bold  mt-2">{card.description}</p>
          <p className="text-gray-700 mt-2">Price : &#x20B9; {card.price.toLocaleString("en-IN")}/night</p>
          <p className="text-gray-700 mt-2">City : {card.location}</p>
          <p className="text-gray-700 mt-2">Country : {card.country}</p>

          <p className="text-gray-700 mt-2">12 Guests | 6Rooms | 1Hall</p>
        </div>
        
        <div className='flex justify-center items-center mb-2'>
        <div className=" w-60 flex justify-center items-center h-12 mt-3 px-6 py-4 border-2 shadow-lg rounded-lg overflow-hidden">
           <p className="text-gray-700 font-bold pb-2 mt-2">Hosted By : {card.Hostname}</p>
        </div>
        </div>
      </div>
    </div>

    <div className="container mx-auto mt-4 px-4 py-8">
       <div className="max-w-3xl flex justify-center  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
             <div className=' border-2 w-[46%] p-3 m-2 shadow-grey-600 shadow-lg shadow-black-500/50 mb-5'> 
                 <div className='flex items-center  '>
                 <p className="text-gray-700 text-2xl font-bold ">&#x20B9; {card.price.toLocaleString("en-IN")}</p>&nbsp;night
                 </div>
                 <div  className='flex justify-between h-18 mt-2 p-3 border-2 border-black rounded-md'>
                      <div className='flex flex-col overflow-hidden' onClick={() => setShowCalendar(true)}>
                            <span  className='text-black ml-2 ' >Check-in</span>
                            <input value={startDate} onChange={handleStartDateChange} className='outline-none' type="date"></input>
                      </div>
                       
                      <span className='h-12 ml-2 border-l-2 border-black'></span>

                      <div className='ml-2 flex flex-col overflow-hidden' onClick={() => setShowCalendar(true)}>
                        
                         <span  className='text-black mr-6' >Check-out</span>
                         <input value={endDate} onChange={handleEndDateChange} className='outline-none ' type="date"></input>
                      </div>  
                 </div>

                 <div className=' flex items-center border-2 border-gray-600 rounded-md mt-3 h-10 '>
                    <input value={guests} onChange={handleGuestCount} placeholder=' Add Guests' type='number' className=' outline-none w-full'></input>
                 </div>
                 
                 <div>
                     <span onClick={checkBooking} className='text-blue-500 cursor-pointer'>Check availability?</span>
                 </div>

                 <div className='flex justify-center text-white items-center border-2 bg-red-600 rounded-md mt-3 h-10'>
                    <button onClick={calculateDays}>Calculate Days</button>
                </div>
                <div className='flex justify-center '>
                  {daysDifference !== null && <span>Number of days between the dates: {daysDifference}</span>}
                </div>
                <div className='flex justify-center'>
                    <span>Book-in :{daysDifference*card.price*guests}</span>
                </div>
                
                 
                 <div className=' flex justify-center text-white items-center border-2 bg-red-600 rounded-md mt-3 h-10'>
                      <button onClick={makePayment}>Reserve</button>
                 </div>
                 <div className='flex justify-center '>
                     <span>You wouldn't be charged yet</span>
                 </div>
             </div>
       </div>
    </div>

       <div className="container mx-auto mt-4 px-4 py-8">
          <div className="max-w-3xl flex justify-center  mx-auto bg-white  rounded-lg overflow-hidden">
          <div className=' border-2 w-[85%] p-3 m-2 shadow-grey-600 shadow-lg shadow-black-500/50'>
              <h4 className='m-3'>Leave a Review</h4>
              <form onSubmit={postReview}>
                 <div className='m-3 flex flex-col'>
                    {/* <label for="rating">Rating</label>
                    <input  value={rating} onChange={(e) => setrating(e.target.value)} className='m-2' type="range" min="1" max="5" id="rating"  name="review[rating]" required></input> */}

                    {/* <fieldset className="starability-slot">
                          <legend>First rating:</legend>
                           <label for="rating">Rating</label>
                           <input  value="1" onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="rating"  name="review[rating]" required></input>
                          <input value="2" onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="no-rate" class="input-no-rate" name="review[rating]"  checked aria-label="No rating." />
                          <input  value="3" onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="first-rate1" name="rating" />
                          <label for="first-rate1" title="Terrible">1 star</label>
                          <input value="4" onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="first-rate2" name="review[rating]"  />
                          <label for="first-rate2" title="Not good">2 stars</label>
                          <input value="5" onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="first-rate3" name="review[rating]"  />
                          <label for="first-rate3" title="Average">3 stars</label>
                          <input value={rating} onChange={(e) => setrating(e.target.value)} className='m-2' type="radio" id="first-rate4" name="review[rating]" />
                          <label for="first-rate4" title="Very good">4 stars</label>  */}
                          {/* <input type="radio" id="first-rate5" name="rating" value="5"/>
                          <label for="first-rate5" title="Amazing">5 stars</label> */}
                    {/* </fieldset>*/}
                          <label for="no-rate">Rating</label>
                      <fieldset className="starability-slot">
                         <input type="radio" checked={rating === "1"} onChange={(e) => setrating(e.target.value)} id="no-rate" className="input-no-rate" name="review[rating]" value="1" />
                         <input type="radio" checked={rating === "1"} onChange={(e) => setrating(e.target.value)}   id="first-rate1" name="review[rating]" value="1" />
                         <label for="first-rate1" title="Terrible">1 star</label>
                         <input type="radio" checked={rating === "2"} onChange={(e) => setrating(e.target.value)}    id="first-rate2" name="review[rating]" value="2" />
                         <label for="first-rate2" title="Not good">2 stars</label>
                         <input type="radio" checked={rating === "3"} onChange={(e) => setrating(e.target.value)}  id="first-rate3" name="review[rating]" value="3" />
                         <label for="first-rate3" title="Average">3 stars</label>
                         <input type="radio" checked={rating === "4"} onChange={(e) => setrating(e.target.value)}  id="first-rate4" name="review[rating]" value="4" />
                         <label for="first-rate4" title="Very good">4 stars</label>
                         <input type="radio"  checked={rating === "5"} onChange={(e) => setrating(e.target.value)} id="first-rate5" name="review[rating]" value="5" />
                         <label for="first-rate5" title="Amazing">5 stars</label>
                    </fieldset>
                 </div>



                 <div className='m-3' >
                    <label for="comments">Comments</label>
                    <textarea value={comments} onChange={(e) => setcomments(e.target.value)} name="review[comments]" id="comments" 
                    className='w-[100%] p-5 border-2  border-l-green-950 rounded-md outline-none' required></textarea>
                 </div>
                  
                 
                 <button className='m-3 bg-red-600 p-2 rounded-md text-white ml-[46%]'>Submit</button>
              </form>

              <div className=' border-2  p-3 m-2 shadow-grey-600 shadow-lg shadow-black-500/50'>
                <div className="grid grid-cols-2 gap-4 p-4">
                   {card.reviews && card.reviews.map((review, index) => (
                     <div key={index} className="border p-4">
                         {/* <p>Rating: {review.rating}&#9733;</p> */}
                        
                         {user && user.fullName ? (<p className='p-1'>{user.fullName}</p>) : (<p className='p-1'>user</p> )}
        
                         <p class="starability-result" data-rating={review.rating}>
                         </p>
                         <p className='p-1'>Comments: {review.comments}</p>
                     </div>
                   ))}
              </div>
             </div>
          </div>
          </div>
       </div>
    
      {/* <Map address="bhopal"/> */}
       <Footer/>
    </> 
  )
}

export default CardDetail