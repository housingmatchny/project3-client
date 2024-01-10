//edit and delete review

import { useState, useEffect, useContext } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { put, get } from '../services/authService'
import StarButton from '../components/StarButton'
import { Label, Textarea } from "flowbite-react";
import { ListingContext } from '../context/listing.context';


const EditReview = () => {
    const [comment, setComment] = useState('')
    const [stars, setStars] = useState(0)
    const [thisId, setThisId] = useState('')



    const { reviewId } = useParams(); //not review._id; we have to pull the reviewId from the params, we're not getting it from the object
    const navigate = useNavigate();  

    const { updateListing } = useContext(ListingContext)
 
  // This effect will run after the initial render and each time
  // the reviewtId coming from the URL parameter `reviewId` changes
   
   useEffect(() => {

    get(`/reviews/edit-review/${reviewId}`)  
       .then((response) => {
        // updateListing(response.data.updatedListing)
         /* 
           We update the state with the previous review data coming from the response.
           This way we set inputs to show the previous inputs
         */
         const prevReview = response.data; //access data 
         console.log("Previous review ==>", prevReview)
         setComment(prevReview.comment);
         setStars(prevReview.stars);
         setThisId(prevReview._id)
       })
       .catch((error) => console.log(error));
     
   }, [reviewId]);//re-renders whenever reviewId changes

   const handleComment = (e) => {
    setComment(e.target.value)
  } 

   const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { comment, stars };
 
    // Make a PUT request to update the review
    put(`/reviews/edit-review/${reviewId}`, requestBody)
      .then((response) => {
        console.log('Updated ===>', response.data)
        updateListing(response.data.updatedListing)
        // Once the request is resolved successfully and the review is updated we navigate back to the previous page (listing details or Profile)
        // navigate(`/listings/details/${response.data.updatedListing._id}`)
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="mt-24">
      <section className="edit-review flex flex-col ml-7 min-h-screen">

        {/* comment outer-box */}
        <div className="p-6 mb-10 min-w-100 min-h-100 mx-auto bg-white rounded-xl shadow-lg items-start space-x-4 ml-0">

          <form onSubmit={handleFormSubmit}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-7">
              Edit your review
            </h5>

            {thisId && <StarButton setStars={setStars} stars={stars} />}

            <div className="w-96 h-96 mb-4" id="textarea">
              <Label htmlFor="comment" />
              {thisId && (
                <Textarea
                  className="my-4 block caret-purple-700"
                  rows="18"
                  id="comment"
                  value={comment}
                  onChange={handleComment}
                />
              )}
            </div>
            
            <div className="flex flex-row justify-end gap-4">
            <button
              type="submit"
              className="btn btn-primary link link-hover tracking-tight"
            >
              Post updated review
            </button>

            {/* link and link-hover from Footer */}
            <button
              type="button"
              className="btn btn-outline btn-primary link link-hover tracking-tight"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  );
}

export default EditReview

  //       <StarButton setStars={setStars} stars={stars}/> 
    //       {/* setStars is like the middleman that allows us to update the stars value; stars is the value.  In this case, it makes sense to pass both setStars and stars to the StarButton as props b/c we will be using both to edit the review.  What we pass down is situational.  */}

    //       <label>Comment:</label>
    //       <input
    //         type="text"
    //         name="comment"
    //         value={comment}
    //         onChange={handleComment}
    //       />

    //       <button type="submit">Submit changes</button>
    //   </form>
    // </div>

    //     {/* <button onClick={deleteReview}>Delete</button> */}
    // </div>