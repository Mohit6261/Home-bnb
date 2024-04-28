import React from 'react'
import { Link } from 'react-router-dom';
import SocialShare from './SocialShare';


const CardFavList = ({result}) => {
  return (
    <div className='flex w-full border-2 border-blue-400 rounded-md'>
        {/* <div  style={{ position: 'relative', display: 'inline-block' }}> */}
           <Link to={`/card/${result._id}`} className="block">  
            <img className="w-80 h-60 rounded-t-lg p-2 " src={result.image} alt="Your Image" />
           </Link>  
           <div className="flex h-[100%] w-[25%] flex-col">
            <p className='mt-4 p-2 font-bold text-2xl'>{result.title}</p>
            <p className='mt-1 p-2 font-semibold text-xl'>{result.location}</p>
            <p className='mt-1 p-2 font-semibold text-xl'>{result.price}</p>
          </div>
           
        {/* </div> */}
    </div>
  )
}

export default CardFavList