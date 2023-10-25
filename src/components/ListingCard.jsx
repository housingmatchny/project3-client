
import {useState, useContext} from "react"
import { RatingContext } from "../context/rating.context"

const ListingCard = () => {
    const {rating} = useContext(RatingContext)

  return (
    <div className={"ListingCard " + rating}>
    
        <button className="theme-btn" onClick={toggleRating}>
        {rating === "empty" ? "solid" : "empty"}
      </button>

    </div>
  )
}

export default ListingCard