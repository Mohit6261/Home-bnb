// import React, { useState } from 'react'
// import Header from './Header'
// import axios from "axios";
// import { API_END_POINT } from './utils/constant.js';
// import toast from"react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import { useGlobal } from './GlobalContext.js';



// const Login = () => {
//   const { globalValue, setGlobalValue } = useGlobal();
//   const [isLogin,setisLogin] = useState(false);
//   const [fullName,setfullName]=useState("");
//   const [email,setemail]=useState("");
//   const [password,setpassword]=useState("");
//   const navigate=useNavigate();

//   const loginHandler = () => {
//         setisLogin(!isLogin);
//   }

//   const getInputData = async (e) => {
//         e.preventDefault();
//         if(!isLogin){

//              try{
//                 const res=await axios.post(`${API_END_POINT}/register`,{fullName,email,password},{
//                   headers:{
//                       "Content-Type":"application/json",
//                   },
//                   withCredentials:true,
//                 });

//                 if(res.data.success){
//                     toast.success(res.data.message);
//                 }

//                 setisLogin(true);


//              }catch(err){
//                 toast.error(err.response.data.message);
//              }

//              setfullName("");
//              setemail("");
//              setpassword("");
//         }

//         else{

//             try{
//               const res=await axios.post(`${API_END_POINT}/login`,{email,password},{
//                  headers:{
//                     "Content-Type":"application/json",
//                  },
//                  withCredentials:true,
//               })

//               if(res && res.data && res.data.success){
//                 toast.success(res.data.message);
//               }
//               setGlobalValue(true);
//               navigate("/");
//             } catch(err){
//                 toast.error(err.response.data.message);
//             }

//             setemail("");
//             setpassword("");

//         }
//   }
//   return ( 
//     <>

//         <div className='flex   justify-center h-screen '>
//           <div className=' w-[30%] h-[45%] border-2 border-red-600 mt-8 rounded-md'>
//                <form onSubmit={getInputData}>
//                 <div><h1 className=' text-xl ml-[44%]'>{isLogin  ? "Login" : "SignUp"}</h1></div>
//                     <div className='m-4 flex flex-col ' >
//                        {!isLogin &&
//                             <input value={fullName} onChange={(e) => setfullName(e.target.value)} type="text" placeholder='Enter name' className='p-3 m-1 border border-x-red-600 outline-none'></input>
//                        }
//                         <input value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder='Enter email' className='p-3 m-1 border border-x-red-600 outline-none'></input>
//                         <input value={password} onChange={(e) => setpassword(e.target.value)}  type="password" placeholder='Enter password' className='p-3 m-1 border border-x-red-600 outline-none'></input>
//                     </div>
//                     <button className='bg-red-600 rounded-md text-white ml-[44%] p-2'>{isLogin  ? "Login" : "SignUp"}</button>
//                     {!isLogin  && <h2 className='ml-[18%] mt-2'> Already have an Account? <span onClick={loginHandler} className='text-blue-600 cursor-pointer'>Login</span></h2> }

//                     {isLogin  && <h2 className='ml-[30%] mt-4'> New to HBNB? <span onClick={loginHandler} className='text-blue-600 cursor-pointer'>SignUp</span></h2> }
//                 </form>
//           </div>
//         </div>
//     </>
//   )
// }

// export default Login


import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
// import { userContext } from "../context/userContext";
import { API_END_POINT } from "./utils/constant";
import toast from"react-hot-toast";
import { useGlobal } from './GlobalContext.js';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice.js";
import Header from "./Header.js";


function LoginPage() {
  const [redirect, setRedirect] = useState(false);
  const { globalValue, setGlobalValue } = useGlobal();
 const [isLogin,setisLogin] = useState(false);
 const dispatch=useDispatch();
 const isLoading = useSelector((store) => store.app.isLoading);
  
 const navigate=useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("*Required"),
    password: Yup.string().required("*Required"),
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      console.log(data);
      const res = await axios.post(`${API_END_POINT}/login`,  data , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (res && res.data && res.data.success) {
        toast.success(res.data.message);
      }
      
      setGlobalValue(true);
      dispatch(setUser(res.data.user));
      navigate("/");

    } catch (e) {
      alert('Login failed');
    }
    finally{
      dispatch(setLoading(false));
   }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
      <>
      <Header/>
     <div className="w-screen  flex  justify-center">
        <div className="grow flex items-center  justify-center ">
      <div className="mb-40 ">
        <h1 className="text-4xl text-center">Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="max-w-md mx-auto">
            <Field
              autoComplete="off"
              id="inputEmail"
              name="email"
              placeholder="your@gmail.com"
              className="w-full border mt-8 mb-1 py-2 px-3 rounded-2xl"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-red-500 text-xs italic"
            />
            <Field
              autoComplete="off"
              id="inputPassword"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border my-1 py-2 px-3 rounded-2xl"
            />
            <ErrorMessage
              name="password"
              component="span"
              className="text-red-500 text-xs italic"
            />
            <button
              type="submit"
              className="w-full bg-[#ff385c] text-white rounded-2xl mt-3 py-2"
            >
              Login
            </button>
            <div className="text-center text-sm py-2 text-[#717171]">
              Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
     </div>
   </>
  );
}

export default LoginPage;