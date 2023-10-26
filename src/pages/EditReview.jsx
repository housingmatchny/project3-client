//edit and delete review

import { useState, useEffect } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { put, axiosDelete, get } from '../services/authService'
import StarButton from '../components/StarButton'


const EditReview = () => {
    const [comment, setComment] = useState('')
    const [stars, setStars] = useState('')

    const { reviewId } = useParams(); //not review._id from the params?
    const navigate = useNavigate();  
 
  // This effect will run after the initial render and each time
  // the reviewtId coming from the URL parameter `reviewId` changes
   
   useEffect(() => {

    get(`/reviews/edit-review/${reviewId}`)  
       .then((response) => {
         /* 
           We update the state with the previous review data coming from the response.
           This way we set inputs to show the previous inputs
         */
         const prevReview = response.data;
         console.log("Previous review ==>", prevReview)
         setComment(prevReview.comment);
         setStars(prevReview.stars);
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
        // Once the request is resolved successfully and the review
        // is updated we navigate back to the listing details page
        navigate(`/listings/${listingId}`)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const deleteReview = () => {     
    // Make a DELETE request to delete the project
    axiosDelete(`/reviews/delete-review/${reviewId}`)//change url to edit-review?
      .then((response) => {
        console.log("Deleted ===>", response)
        // Once the delete request is resolved successfully
        // navigate back to the listing details page.
        navigate(`/listings/${listingId}`);
      })
      .catch((err) => console.log(err));
  }; 


  return (
    <div>
    <form onSubmit={handleFormSubmit}>
          <h2>Edit review</h2>
          <StarButton setStars={setStars} stars={stars}/>

          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={handleComment}
          />

          <button type="submit">Submit changes</button>
        </form>

        <button onClick={deleteReview}>Delete review</button>
    </div>
  )
}

export default EditReview