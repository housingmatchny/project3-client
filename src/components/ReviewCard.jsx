//Review card that appears on person's profile; not the review in Listing Details

import StarButton from "./StarButton";
import { axiosDelete, get } from "../services/authService";
import { useState, useEffect, useContext} from "react";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
// import { deleteReview } from "../services/reviewService";
import StarButtonAverage from "./StarButtonAverage";
import { getAverageStar } from "../services/getAverageStar";


//singleReview destructured out of props; passed down from TenantProfile page

const ReviewCard = ({ singleReview, getTenantInfo, handleError }) => {

  const { user } = useContext(AuthContext)

  const [stars, setStars] = useState(singleReview.stars)

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
      // navigate back to previous page.
      getTenantInfo(user._id)
      // navigate(0);
    })
    .catch((err) => console.log(err)); 
  }

  // useEffect(() => {
  //   set
  // }, [singleReview])



  return (
   <div>
   {singleReview ? (
    <>
      <div key={singleReview._id}>
        <div className="space-y-1 font-medium dark:text-white">
          
          { singleReview.listing &&
            <Link to={`/listings/details/${singleReview.listing._id}`}>
              <div>
                <img src={singleReview.listing.imgUrl} />
                {singleReview.listing.streetAddress}
              </div>
            </Link>
          }

          <div className="flex items-center mb-1">
            <StarButton stars={stars} setStars={setStars} read={true} />
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">{singleReview.comment}</p>

          {/* //if the user exists and is the owner of the review */}
          {user && reviewOwner(singleReview) && (
            <div className="flex items-center mt-3">
              <Link to={`/reviews/edit-review/${singleReview._id}`}> 
                <button className="block mb-5 text-sm font-medium pr-4 text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </button>
              </Link>
                   
              <button
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={() => deleteReview(singleReview._id)}>
                Delete
              </button>
            </div>
          )}
        
        </div>
      </div>
    </>
) : <p>{handleError}</p>
}
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
    
