//all listings
//do we add StarButton with default of average?

import ListingCard from "../components/ListingCard"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { get } from "../services/authService"
import { Carousel } from 'flowbite-react';

const Listings = () => {

  const [listings, setListings] = useState([])

  let updateListing = () => {

    get('/listings')
    .then((response) => {
      console.log("Listing ====>", response.data)
      setListings(response.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  useEffect(() => {

    updateListing()

  }, [])

  return (
    <div>
    <h3 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your housing matches</h3>
    {/* carousel wraps all the cards, not each individual card; false maintains a static carousel; had to remove Carousel b/c it was not working */}
    {listings.length ? (
      <div>
        {listings.map((listing) => (
          <div key={listing._id}>
            <ListingCard
              singleListing={listing}
              updateListing={updateListing}
            />
            {/* <Link to={`/listings/details/${listing._id}`} key={listing?._id}> See details </Link> */}
          </div>
        ))}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default Listings