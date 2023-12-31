//Details page
//NOTE: order of functions do not matter; just remember that the use hooks are best declared at the top of the component

import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { ListingContext } from "../context/listing.context";
import StarButton from "../components/StarButton";
import StarButtonAverage from "../components/StarButtonAverage";
import { axiosDelete } from "../services/authService";
import { Label, Textarea } from "flowbite-react";
import LikeButton from "../components/LikeButton";



const ListingDetails = ({singleListing, toggleCard}) => {

  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stars, setStars] = useState(0);


  const { id } = useParams(); //listing id out of params

  const { user } = useContext(AuthContext); //allows us to access the values of AuthContext; in this case, we destructure user out of AuthContext

  const { listings, getListing, listing, average, updateListing, reviewOwner } = useContext(ListingContext)

  const navigate = useNavigate(); //allows us to navigate

  const handleBack = (e) => {
    navigate(-1)
  }

  //triggers new review, inclusive of comment and stars
  const handleSubmit = (e) => {
    e.preventDefault();

    let newReview = {
      comment,
      stars,
      listing: id,
      tenant: user._id,
    };
    //send newReview to the API endpoint; if successful, the then block will execute: retrieve listing detail by id and reset/clear comment after successful submission
    post("/reviews/add-review", newReview)
      .then((response) => {
        console.log("Added review ===>", response.data);
        updateListing(response.data.updatedListing)
        // getListing(); //immediately fetch the updated listing from the API with the comment
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //updates comment state variable with new input
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // let reviewOwner = (review) => {
  //   if (review.tenant && review.tenant._id === user._id) {
  //     return true}
  //   return false
  // }; 

  const deleteReview = (reviewId) => {
    // Make a DELETE request to delete the project
    axiosDelete(`/reviews/delete-review/${reviewId}`)
      .then((response) => {
        console.log("Deleted ===>", response);
        updateListing(response.data.updatedListing)
        // Once the delete request is resolved successfully
        // navigate back to the listing details page.
        // navigate(0);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListing(id); //retrieve listing detail whenever the id changes
  }, [id, listing, listings]);

  return (
    <div>
      {/* when the listing exists */}
      {listing && (
        <>
          {/* <Link to={`/listings`}> */}
          {/* </Link> */}

          <div className="flex flex-col gap-8 ml-7 mt-20 relative">
            <div>
            <button
                type="button"
                onClick={()=>handleBack()}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover"
              >
                Back to Listings
              </button>
            </div>

            <section className="listing-summary">
              <img
                className="object-scale-down h-96 w-auto drop-shadow-md rounded-md"
                src={listing.imgUrl}
                alt="property image"
              />

              <div className="relative w-auto sm:w-80">
                <h5 className="mt-8 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{listing.streetAddress}</h5>
                <p>{listing.borough}</p>
                <div className="absolute top-2 right-2">
                  {/* //removed top-2 from above */}
                  <LikeButton singleListing={listing} toggleCard={toggleCard}/>
                </div>
              </div>

                <div className="flex space-x-20">
                  <div className="flex flex-col">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(listing.price)}{" "}
                      per month
                    </h3>
                    <StarButtonAverage overallRating={average} />
                  </div>
                </div>
              <br />
              </section>
          


            <section className="listing-details">
              <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">
                Details
              </h3>
              <h4>{`Beds: ${listing.beds} | Baths: ${listing.baths}`}</h4>
              <p>{`${listing.neighborhood} | ${listing.borough} | ${listing.zipCode}`}</p>
              <p>Contact: <a href={`tel:${listing.phone}`}>{listing.phone}</a></p>
              {/* use the tel protocol to create a clickable link that is also accessible to screen readers */}
            <br />
            </section>



            {/* review form below */}
            <section className="write-review">
              <div>
                <h3 className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">
                {`Community Reviews (${listing.reviews.length})`}
                </h3>
              </div>
              <div className="p-6 mb-10 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-start space-x-4 ml-0">
                <form onSubmit={handleSubmit}>
                  <h2 className="font-semibold text-xl mb-4">
                    Start your review of {listing.streetAddress}
                  </h2>
                  <StarButton setStars={setStars} read={false} />

                  <div className="max-w-lg mb-4" id="textarea">
                    {/* Label for textarea for accessibility */}
                    <Label htmlFor="comment" />
                    <Textarea
                      className="my-2 block caret-purple-700"
                      id="comment"
                      placeholder="Leave a comment..."
                      required
                      rows={4}
                      value={comment}
                      onChange={handleComment}
                    />
                  </div>

                  <button
                    type="submit"
                    // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    className="focus:outline-none tracking-tight text-white  bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm justify-start px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Post review
                  </button>
                </form>

                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            </section>

            {/* Review Card */}

            {user && listing && listing.reviews.length ? (
              <>
                {listing.reviews.map((review) => (
                  <article key={review._id} className="p-4 max-w-lg">
                    <div className="space-y-1 font-medium dark:text-white">
                      {review.tenant && <p>{review.tenant.name}</p>}
                      <div className="flex items-center mb-1">
                        <StarButton stars={review.stars} read={true}/>
                      </div>
                      <p className="font-normal mb-2 pb-2 text-gray-500 dark:text-gray-400">
                        {review.comment}
                      </p>

                      {reviewOwner(review) && (
                        <div className="flex items-center mt-3">
                          <Link to={`/reviews/edit-review/${review._id}`}>
                            <button className="block mb-5 text-sm font-medium pr-4 text-blue-600 hover:underline dark:text-blue-500">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                            onClick={() => deleteReview(review._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      <hr />
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <h5 className="text-left text-1xl font-normal tracking-tight text-gray-900 dark:text-white mb-4">No reviews yet. Be the first to post a review and help the community!</h5>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingDetails;
