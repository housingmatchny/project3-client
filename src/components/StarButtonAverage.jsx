//overall star rating

import { useState, useContext } from "react"
import { Rating } from 'react-simple-star-rating'
import { ListingContext } from "../context/listing.context";

//Rating source: npm package, react-simple-star-rating

//overall rating passed down from Listing Details page
const StarButtonAverage = ({ overallRating }) => {
  
  // const average = useContext(ListingContext)

    return (
      <div>
        <Rating
          size={42}
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
          initialValue={overallRating}
          readonly={true} //means that the rating cannot be changed
          allowFraction={true}
        //   className="flex items-center mb-1"
        />
      </div>
    )
  };


export default StarButtonAverage





