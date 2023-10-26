
import {useState, useContext} from "react"
import LikeButton from "./LikeButton"

const ListingCard = ({ singleListing, updateListing }) => {
    // updateListing with like
   

  return (
    <div>

    {/* {
      listing && */}

      <>
        <h2>{singleListing.streetAddress}</h2>
        
        <LikeButton singleListing={singleListing} updateListing={updateListing}/>
      </>
    {/* } */}

        {/* <button className="theme-btn" onClick={toggleRating}>
        {rating === "empty" ? "solid" : "empty"}
      </button> */}

      {/* <hr /> */}

    </div>
  )
}

export default ListingCard