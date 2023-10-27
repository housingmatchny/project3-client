//Details page
//NOTE: order of functions do not matter; just remember that the use hooks are best declared at the top of the component

import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import StarButton from "../components/StarButton";
import ReviewCard from "../components/ReviewCard";
import ListingCard from "../components/ListingCard";
import StarButtonAverage from "../components/StarButtonAverage";
import { axiosDelete } from "../services/authService";
import { Rating } from "react-simple-star-rating";
import { Label, Textarea } from "flowbite-react";
import Reviews from "./Reviews";

const ListingDetails = () => {
  const [listing, setListing] = useState(null);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [average, setAverage] = useState(0);

  const { id } = useParams(); //listing id out of params

  const { user } = useContext(AuthContext); //allows us to access the values of AuthContext; in this case, we destructure user out of AuthContext

  const navigate = useNavigate(); //allows us to navigate

  const getListing = () => {
    get(`/listings/details/${id}`) //get listing by id and update listing state to be the listing; also calculate the average star rating score
      .then((response) => {
        console.log("Found Listing ===>", response.data);
        setListing(response.data);

        let thisAverage =
          response.data.reviews.reduce(
            (accumulator, review) => accumulator + review.stars,
            0
          ) / response.data.reviews.length;
        console.log("Average", thisAverage);
        if (thisAverage) {
          setAverage(thisAverage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }; //updates comment state variable with new input
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  //triggers new review, inclusive of comment and stars
  const handleSubmit = (e) => {
    e.preventDefault();

    let newReview = {
      comment,
      stars,
      listing: id,
      tenant: user._id,
    };
    //send newReview to the API endpoint; if successful, .then block will execute: retrieve listing detail by id and reset/clear comment after successful submission
    post("/reviews/add-review", newReview)
      .then((response) => {
        console.log("Added review ===>", response.data);
        getListing();
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let reviewOwner = (review) => {
    return review.tenant._id === user._id;
  }; //returns true or false whether the tenant id of the review object matches the user id (i.e., whether this person owns the review)

  const deleteReview = (reviewId) => {
    // Make a DELETE request to delete the project
    axiosDelete(`/reviews/delete-review/${reviewId}`)
      .then((response) => {
        console.log("Deleted ===>", response);
        // Once the delete request is resolved successfully
        // navigate back to the listing details page.
        navigate(0);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListing(); //retrieve listing detail whenever the id changes
  }, [id]);

  return (
    <div>
    {/* when the listing exists */}
    {listing && (
      <>
        <Link to={`/listings`}>Back to Listings</Link>
  
        {/* <ListingCard singleListing={listing}/> */}
  
        <div className="flex flex-col">
          <img
            className="object-scale-down h-auto max-w-md drop-shadow-md rounded-md"
            src={listing.imgUrl}
            alt="property image"
          />
  
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <p>{listing.streetAddress}</p>
          </h5>
          <p>{listing.borough}</p>
          {/* brought average formula here */}
  
          <div className="flex space-x-20">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(listing.price)}{" "}
              per month
            </h3>
  
            <StarButtonAverage overallRating={average} />
  
            <hr />
            <br />
            <div>
              <h3 className="text-2xl text-gray-900 dark:text-white">Details</h3>
              <h4>{`Beds: ${listing.beds} | Baths: ${listing.baths}`}</h4>
              <p>{`${listing.neighborhood} | ${listing.borough} | ${listing.zipCode}`}</p>
              <p>{listing.phone}</p>
            </div>
            <hr />
          </div>
        </div>

        <br />
  
        <div>
          <h3 className="text-2xl text-gray-900 dark:text-white">
            Reviews from the Community
          </h3>
        </div>
        {/* review form below */}
        <form onSubmit={handleSubmit}>
          <h2>Write a review</h2>
          <StarButton setStars={setStars} />
  
          <div className="max-w-md" id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="comment" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              value={comment}
              onChange={handleComment}
            />
          </div>
  
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Post
          </button>
        </form>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        {/* Review Card */}
        {user && listing && listing.reviews.length ? (
          <>
            {listing.reviews.map((review) => (
              <div key={review._id}>
                <h3>{review.comment}</h3>
                <Rating
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  // onClick={handleRating}
                  initialValue={review.stars}
                />
                <p>{review.tenant.name}</p>
                {reviewOwner(review) && (
                  <Link to={`/reviews/edit-review/${review._id}`}>
                    <button>Edit</button>
                  </Link>
                )}
                {reviewOwner(review) && (
                  <button onClick={() => deleteReview(review._id)}>Delete</button>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>No reviews yet</p>
        )}
      </>
    )}
  </div>
  )
  }

export default ListingDetails;