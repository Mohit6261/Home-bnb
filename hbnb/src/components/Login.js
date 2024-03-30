import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isLogin,setisLogin] = useState(false);
  return ( 
    <>
         <Header/>
        <div className='flex   justify-center h-screen '>
          <div className=' w-[30%] h-[45%] border-2 border-red-600 mt-8 rounded-md'>
              
                <div><h1 className=' text-xl ml-[44%]'>{isLogin  ? "Login" : "SignUp"}</h1></div>
                    <div className='m-4 flex flex-col ' >
                       {!isLogin &&
                            <input type="text" placeholder='Enter name' className='p-3 m-1 border border-x-red-600 outline-none'></input>
                       }
                        <input  type="text" placeholder='Enter email' className='p-3 m-1 border border-x-red-600 outline-none'></input>
                        <input  type="password" placeholder='Enter password' className='p-3 m-1 border border-x-red-600 outline-none'></input>
                    </div>
                    <button className='bg-red-600 rounded-md text-white ml-[44%] p-2'>{isLogin  ? "Login" : "SignUp"}</button>
                    {!isLogin  && <h2 className='ml-[18%] mt-2'> Already have an Account? <span className='text-blue-600 cursor-pointer'>Login</span></h2> }

                    {isLogin  && <h2 className='ml-[30%] mt-4'> New to HBNB? <span className='text-blue-600 cursor-pointer'>SignUp</span></h2> }
                
          </div>
        </div>
    </>
  )
}

export default Login