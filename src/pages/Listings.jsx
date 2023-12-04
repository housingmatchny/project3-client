//all listings

import ListingCard from "../components/ListingCard"
import { useEffect, useContext } from "react"
import { ListingContext } from "../context/listing.context";
import { Carousel } from 'flowbite-react';

const Listings = () => {
  const {listings, setListing, getListings} = useContext(ListingContext)

  useEffect(() => {

    if (!listings) {
      getListings()
    }

  }, [])

  return (
    <div>
    <h3 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your housing matches</h3>
    {/* carousel wraps all the cards, not each individual card; false maintains a static carousel; had to remove Carousel b/c it was not working */}
    
    {listings && listings.length ? (
      <div>
        {listings.map((listing) => (
          <div key={listing._id}>
            <ListingCard
              singleListing={listing}
            />
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