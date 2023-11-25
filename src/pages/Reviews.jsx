import ReviewCard from "../components/ReviewCard"
import { useState, useEffect } from "react"
import { get } from "../services/authService"

const Reviews = () => {

  const [reviews, setReviews] = useState([])

  let updateReview = () => {

    //get all the reviews from the API and update state with the reviews data
    get('/reviews')
    .then((response) => {
      // console.log("Review ====>", response.data)
      setReviews(response.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  useEffect(() => {

    updateReview()

  }, [])

  return (
    <div>
        {/* if there are reviews (reviews.length>0), show each review card, passing down each review as singleReview and the updateReview function as props */}
      {
        reviews.length ? 
        <>
         { reviews.map((review) => {
            return <ReviewCard key={review?._id} singleReview={review} setSingleReview={setReviews} updateReview={updateReview}/>
          })}

        </>
        : <p>Loading...</p>
      }
    </div>
  )
}

export default Reviews