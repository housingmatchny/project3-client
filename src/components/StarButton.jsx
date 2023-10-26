//stars on a review card

import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { get } from "../services/authService"

import { Rating } from 'react-simple-star-rating'


const StarButton = ({ setStars }) => {
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
    setStars(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  return (
    <div >
      <Rating emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }}
        onClick={handleRating}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        // onPointerMove={onPointerMove}
        initialValue={rating}
        /* Available Props */
      />
    </div>
  )
  }
  
  export default StarButton


