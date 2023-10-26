import ListingCard from "../components/ListingCard"
import { useState, useEffect } from "react"
import { get } from "../services/authService"
import { Link } from 'react-router-dom'

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
      {
        listings.length ? 
        <>
         { listings.map((listing) => {
            return (
              <>
                 <ListingCard singleListing={listing} updateListing={updateListing}/>
                  <Link to={`/listings/details/${listing._id}`} key={listing?._id}>see details</Link>
                  <hr />
              </>
              
              )
          })}

        </>
        : <p>Loading...</p>
      }
    </div>
  )
}

export default Listings