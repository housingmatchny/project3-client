//Card for writing reviews: user can write comment and rate the stars; model after Yelp review card

import StarButton from "./StarButton";
import { axiosDelete, get } from "../services/authService";
import { useState, useEffect, useContext} from "react";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import StarButtonAverage from "./StarButtonAverage";


//singleReview and updateReview destructured out of props; passed down from Reviews page
//shows the Star Button and comment; according to the Review model, each review has a comment key; remember, singleReview comes from Reviews, where singleReview={review}
//passes down singleReview and updateReview to the Star Button as props

const ReviewCard = ({ singleReview, getTenantInfo }) => {

  const { user } = useContext(AuthContext)
// const [reviews, setReviews] = useState([])

//   let updateReview = () => {

//     //get all the reviews from the API and update state with the reviews data
//     get('/reviews')
//     .then((response) => {
//       console.log("Review ====>", response.data)
//       setReviews(response.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })

//   }

//   useEffect(() => {

//     updateReview()

//   }, [])


let reviewOwner = (review) => {
  console.log("Review===>", review)
  return review.tenant === user._id
} //returns true or false

const deleteReview = (reviewId) => { 

  // Make a DELETE request to delete the project
  axiosDelete(`/reviews/delete-review/${reviewId}`)
    .then((response) => {
      console.log("Deleted ===>", response)
      // Once the delete request is resolved successfully
      // navigate back to the listing details page.
      getTenantInfo(user._id)
      // navigate(0);
    })
    .catch((err) => console.log(err));
}; 

  return (
   <div>
   {singleReview ? (
  <>

      <div key={singleReview._id}>
        <div className="space-y-1 font-medium dark:text-white">
          <p>{singleReview.tenant.name}</p>
          <div className="flex items-center mb-1">
            {/* <StarButton stars={singleReview.stars} /> */}
            <StarButtonAverage overallRating={singleReview.stars} />
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">{singleReview.comment}</p>

          {/* //if the user exists and is the owner of the review */}
          {user && reviewOwner(singleReview) && (
            <Link to={`/reviews/edit-review/${singleReview._id}`} className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Edit
            </Link>
          )}
          
          {user && reviewOwner(singleReview) && (
            <Link onClick={() => deleteReview(singleReview._id)}>
              Delete
            </Link>
          )}
        </div>
      </div>
  </>
) : <p>No reviews available</p>}
</div>
)}

export default ReviewCard


{/* {user && listing && listing.reviews.length ? (
  <>
    {listing.reviews.map((review) => (
      <div key={review._id}>
        <p>{review.tenant.name}</p>
        <StarButton 
          initialValue={review.stars} 
        />
        <h3>{review.comment}</h3>

        {reviewOwner(review) && (
          <Link to={`/reviews/edit-review/${review._id}`}>
            <button>Edit</button>
          </Link>
        )}

        {reviewOwner(review) && (
          <button onClick={() => deleteReview(review._id)}>
            Delete
          </button>
        )}
      </div>
    ))}
  </>
) : (
  <p>No reviews available</p>
)} */}


{/* <div className="flex items-center mb-4 space-x-4">

        <div className="space-y-1 font-medium dark:text-white">
            <p>{review.tenant.name}</p>
        </div>
    </div>
    <div className="flex items-center mb-1">
        <StarButton 
              initialValue={review.stars} 
            />
    </div>
    <p className="mb-2 text-gray-500 dark:text-gray-400">{review.comment}</p>
    
    {reviewOwner(review) && (
              <Link to={`/reviews/edit-review/${review._id}`} className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Edit
              </Link>
            )}
    
    {reviewOwner(review) && (
              <button onClick={() => deleteReview(review._id)}>
                Delete
              </button>
            )}
  
*/}
    
