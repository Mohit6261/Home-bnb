

import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useGlobal } from './GlobalContext';
import { API_END_POINT } from './utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaHome } from "react-icons/fa";
//import socketIOClient from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import store from "../redux/store";
import { setUser } from "../redux/userSlice";
import { useState } from 'react';
import { setsearch } from '../redux/searchSlice';



const Header = () => {

  
  const navigate=useNavigate()
  const { globalValue, setGlobalValue } = useGlobal();
  const user= useSelector((store) => store.app.user);
  const dispatch=useDispatch();
  const [showCountryList, setShowCountryList] = useState(false);
  const [showLocationList, setShowLocationList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [index,setindex]=useState(null);
  const [chk,setchk]=useState(null);

  
   //  const handleCountryClick = () => {
   //      setShowCountryList(!showCountryList);
   //  };
    
   const handleCountryClick = () => {
      setShowCountryList(!showCountryList);
      setShowLocationList(false); // Hide location list if open
      
  };

  const handleLocationClick = () => {
   
   setShowLocationList(!showLocationList);
   setShowCountryList(false); // Hide country list if open
};


const selectCountry = (country,index) => {
   setSelectedCountry(country);
   setSelectedCities(countries[index].cities);
   setindex(index);
   setShowCountryList(false);
};
 
const selectCity = (city) => {
    //setSelectedCities(city);
    setchk(city);
    setShowLocationList(false);
}

const searchByUser = async () => {
     try{
        console.log(selectedCountry.name);
        console.log(chk);
        const res=await axios.get(`${API_END_POINT}/listings/searchlistingbyuser`,{
         params: {
           chk: chk,
           selectedCountry:selectedCountry.name,
       },
       headers: {
           "Content-Type": "application/json"
       },
       withCredentials: true});
       dispatch(setsearch(res.data));
       console.log(res);
       navigate("/searchresult");
       if(!res.data.success){
           toast.error(res.data.message);
       }
       
     }catch(err){
        console.log(err);
     }
}

   // const countries = ["India", "United States", "Russia","Britain","Japan","Israel","France"]; // Replace with your list of countries
   const countries = [
      {
          name: "India",
          cities: ["Bhopal", "Indore", "Ujjain"]
      },
      {
          name: "United States",
          cities: ["Malibu", "New York", "Pensylvenia"]
      },
      {
          name: "Russia",
          cities: ["Moscow", "kharkyiv", "Saint Petersburg"]
      },
      {
         name: "France",
         cities: ["Paris", "Lyon"]
      },
      {
        name: "China",
        cities: ["Beijing", "Shanghai"]
       }
  ];

  const toggleLogin = () => {
        navigate('/login');
  };

  const routeFavourite = () => {
     if(globalValue==true){
      navigate('/favouriteListing');
     }
     else{
       navigate("/login");
     } 
  }
 
  const logoutHandler = async () => {
    try{
      const res=await axios.get(`${API_END_POINT}/logout`);
      if(res.data.success){
         toast.success(res.data.message);
         
      }
      
      dispatch(setUser(null));
      // const socket = socketIOClient(`${API_END_POINT}`);
      // socket.emit('logout'
      setGlobalValue(false);
      window.location.reload();
      navigate("/");
      
    }catch(err){
       console.log(err);
    }

}

 const FirstLogin = () => {
     if(globalValue==false){
        navigate("/login")
     }
     if(globalValue==true){
        navigate("/newlisting");
     }
 }
    
const Homeroute = () => {
     navigate("/");
}
  return (
  <>
    <div className='sticky top-0 z-10  bg-indigo-200'>
    <div className='flex justify-between items-center  '>
        <div className=' flex items-center'>
            <img className='w-[9%] ml-7 mt-1 ' src='https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png' alt='logo'></img>
            <h1 className=' font-bold ml-2 mt-1 text-2xl text-red-600'>HBNB</h1>
            <div onClick={Homeroute} className='border-2 flex items-center mt-3 ml-6 hover:border-red-300 border-black text-xl font-bold text-red-600 rounded-md p-1 cursor-pointer'>
            Home
         </div>
        </div>

         
         
         <div className='flex items-center mt-5 justify-between w-96  mr-8 border-2 p-2 border-black rounded-3xl'>
            
                <span onClick={handleCountryClick} className='text-base text-bold ml-2 cursor-pointer'>{selectedCountry ? selectedCountry.name : "AnyCountry"}</span>
                {/* <div className='fixed-inset backdrop-blur-sm bg-opacity-30'>
                    
                </div> */}
           
            <span className='h-6 border-l-2 border-black '></span>
            <span onClick={handleLocationClick} className=' text-bold text-base cursor-pointer'>{chk ? chk : "AnyLocation"}</span>
            <span className='h-6 border-l-2 border-black'></span>
            {/* <span className=' text-base text-gray-500'>Add guests</span> */}
            <div onClick={searchByUser}  className='bg-red-500 h-8 w-8 rounded-2xl flex justify-center cursor-pointer items-center'>
            <CiSearch className='text-white'/>
            </div>
            <FaHome onClick={routeFavourite} className='flex text-2xl ml-3 cursor-pointer'/>

            {showCountryList && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-white p-6 border border-gray-300 shadow-md rounded-md font-bold text-black max-h-96 overflow-y-auto" style={{ maxHeight: "80vh" }}>
                                <ul>
                                    {countries.map((country, index) => (
                                        <li key={index} className="cursor-pointer"  onClick={() => selectCountry(country,index)}>{country.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

            {showLocationList  && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-white p-6 border border-gray-300 shadow-md rounded-md font-bold text-black max-h-96 overflow-y-auto" style={{ maxHeight: "80vh" }}>
                                <ul>
                                    {selectedCities.map((city, index) => (
                                        <li key={index} className="cursor-pointer"  onClick={() => selectCity(city)} >{city}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
         </div>
           
         

          <div onClick={FirstLogin} className='flex'>
           {/* <Link to={`/newListing`} className="block"> */}
              <span  className='text-xl text-red-600 cursor-pointer border-2 border-black rounded-lg p-1 hover:border-red-300 mt-4 mr-8'>Home-bnb your home</span>
            {/* </Link> */}
          </div> 


           <div className=' px-10 flex mt-4 '>
           {/* <button onClick={toggleLogin} className=' text-white bg-red-600 rounded-md mr-3 p-1'>Login</button> */}
           {!globalValue && <button onClick={toggleLogin} className=' text-white bg-red-600 rounded-md mr-4 p-1 hover:text-black'>SignUp/Login</button>}
           {globalValue && <button onClick={ logoutHandler} className=' text-white bg-red-600 rounded-md mr-4 p-1 hover:text-black'>Logout</button>}
           
           </div>
      
       
    </div>
    <hr className="w-[100%] h-1 mx-auto my-4  border-0 rounded md:my-10 dark:bg-gray-700"/>
    </div>

    
  </> 
    
  )
}

export default Header