import React from 'react'

const Header = () => {
  return (
  <>
    <div>
    <div className='flex justify-between items-center '>
        <div className=' flex items-center'>
            <img className="w-[20%] ml-7" src="data:image/png;base64,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" alt="airbnb logo"></img>
            <h1 className=' font-bold  text-2xl text-red-600'>Airbnb</h1>
        </div>
       
          <div className='flex'>
           <span className='text-2xl'>Airbnb your home</span>
           <div className=' px-10 flex'>
           <button className=' text-white bg-red-600 rounded-md mr-3 p-1'>Login</button>
           <button className=' text-white bg-red-600 rounded-md mr-3 p-1'>SignUp</button>
           </div>
       </div>
       
    </div>
    <hr className="w-[100%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
    </div>
  </> 
    
  )
}

export default Header