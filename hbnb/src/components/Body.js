import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse.js";
import Login from "./Login.js";
import Listings from "./Listings.js";
import CardDetail from "./CardDetail.js";
import NewListing from "./NewListing.js";
import Register from "./Register.js";
import FavouriteListing from "./FavouriteListing.js";
import Bookings from "./Bookings.js";

const Body = () => {

    const appRouter = createBrowserRouter([
         {
            path:"/login",
            element:<Login/>
         },
        {
           path:"/",
           element:<Browse/>
        },
       
        {
            path:"/data",
            element:<Listings/>
        },
        {
            path:"/card/:id",
            element:<CardDetail/>
        },
        {
            path:"/newListing",
            element:<NewListing/>
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/favouriteListing",
            element:<FavouriteListing/>
        },
        {
            path:"/bookings",
            element:<Bookings/>
        }
    ])

     return(
        <div>
            <RouterProvider router={appRouter}/>
        </div>
     )
}

export default Body;