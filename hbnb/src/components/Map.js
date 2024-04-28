import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

// const options = {
//     method: 'GET',
//     url: 'https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByLocationV2',
//     params: {
//       location: 'london',
//     },
//     headers: {
//         'X-RapidAPI-Key': '5d207c6be1mshc549c3f7b32d56cp1dbc4ajsn4bacad7fce6a',
//         'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
//       }
//   };
  
const Map = () => {
    const [coordinates, setcoordinates] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios(options);
    //             console.log(response.data.data.list[0].listing.coordinate);
    //             //etData(response.data);
    //             const result=response.data.data.list[0].listing.coordinate;
    //             setcoordinates(result);
    //         } catch (error) {
    //                 console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, []);


    return (
        <div className='ml-[20%]' style={{  height: '400px', width: '60%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBmu7qgm8kptw-D_6an20riR1ZPKneD6wo' }}
                defaultCenter={{ lat: 23.259933, lng: 77.412613 }} // Default center
                defaultZoom={12} // Default zoom level
                 center={coordinates} // Uncomment this line if you have coordinates
            >
                {/* Marker for the address */}
                 {/* <Marker lat={coordinates.lat} lng={coordinates.lng} /> */}
            </GoogleMapReact>
        </div>
    );
};





//const Map=()=>{
    // const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

    // useEffect(() => {
    //     const fetchCoordinates = async () => {
    //         try {
    //             const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBmu7qgm8kptw-D_6an20riR1ZPKneD6wo`);
    //             console.log(response);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch coordinates');
    //             }
    //             const data = await response.json();
    //             if (data.results && data.results.length > 0) {
    //                 const { lat, lng } = data.results[0].geometry.location;
    //                 setCoordinates({ lat, lng });
    //             } else {
    //                 throw new Error('No results found');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching coordinates:', error);
    //         }
    //     };

    //     if (address) {
    //         fetchCoordinates();
    //     }
    // }, [address]);


//   return (
//     <div className='ml-[20%]' style={{  height: '400px', width: '60%' }}>
//         <GoogleMapReact
//             bootstrapURLKeys={{ key: 'AIzaSyBmu7qgm8kptw-D_6an20riR1ZPKneD6wo' }}
//             defaultCenter={{ lat: 23.259933, lng: 77.412613 }} // Default center
//             defaultZoom={12} // Default zoom level
//              //center={coordinates} // Uncomment this line if you have coordinates
//         >
//             {/* Marker for the address */}
//             {/* <Marker lat={coordinates.lat} lng={coordinates.lng} /> */}
//         </GoogleMapReact>
//     </div>
// );
//}

export default Map