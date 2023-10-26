// ListingCard - features single listing with the updated like.  This is not the listing detail, though!  We link to details through the Listings page

import {useState, useContext} from "react"
import LikeButton from "./LikeButton"
import { Rating } from 'react-simple-star-rating'

// updateListing with like
const ListingCard = ({ singleListing, updateListing }) => {

  return (
    <div>

      <>
        <h2>{singleListing.streetAddress}</h2>
        <h3>{singleListing.price}</h3>
        <p>{singleListing.borough}</p>
        {/* <Rating
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              initialValue={average}
              readonly={true}
              allowFraction={true}
        /> */}
        
        <LikeButton singleListing={singleListing} updateListing={updateListing}/>
      </>

    </div>
  )
}

export default ListingCard