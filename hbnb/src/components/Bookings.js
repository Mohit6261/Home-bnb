import React from 'react';
import { useLocation } from 'react-router-dom';

const Bookings = () => {
    const location = useLocation();
    const listing = location.state ? location.state.listing : null;
    console.log(listing);
  return (
    <div>
        YOu booked your destination.
    </div>
  )
}

export default Bookings