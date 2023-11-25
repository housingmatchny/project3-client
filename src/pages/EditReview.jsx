//edit and delete review

import { useState, useEffect, useContext } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { put, axiosDelete, get } from '../services/authService'
import StarButton from '../components/StarButton'
import { Label, Textarea } from "flowbite-react";
import { ListingContext } from '../context/listing.context';


const EditReview = () => {
    const [comment, setComment] = useState('')
    const [stars, setStars] = useState('')

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
        // Once the request is resolved successfully and the review
        // is updated we navigate back to the previous page (listing details or Profile?)
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  // const deleteReview = () => {     
  //   // Make a DELETE request to delete the project
  //   axiosDelete(`/reviews/delete-review/${reviewId}`)
  //     .then((response) => {
  //       console.log("Deleted ===>", response)
  //       // Once the delete request is resolved successfully
  //       // navigate back to the listing details page.
  //       navigate(-1);
  //     })
  //     .catch((err) => console.log(err));
  // }; 


  return (
    <div>
      <button type="button"
        className="ml-7 mb-7 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => navigate(-1)}
      >
        Back
      </button>
    

      <section className="edit-review flex flex-col ml-7">
        <div className="p-6 mb-10 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-start space-x-4 ml-0">
        <form onSubmit={handleFormSubmit}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-7">Edit your review</h5>

          <StarButton setStars={setStars} stars={stars}/> 

          <div className="max-w-lg mb-4" id="textarea">
            <Label htmlFor="comment" />
            <Textarea
              className="my-2 block"
              id="comment"
              value={comment}
              onChange={handleComment}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit changes
          </button>
        </form>
        
        </div>
      </section>
    </div>
  
  )
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