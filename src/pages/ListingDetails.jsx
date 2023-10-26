import {useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import { get, post } from '../services/authService';
import { AuthContext } from '../context/auth.context';
import StarButton from '../components/StarButton';
import { Rating } from 'react-simple-star-rating'
import EditReview from './EditReview';

const ListingDetails = () => {

  const [listing, setListing] = useState(null)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [stars, setStars] = useState(0)
  const [average, setAverage] = useState(0)
  
  const { id } = useParams()

  const { user } = useContext(AuthContext)//allows us to access the values of AuthContext; in this case, we destructure user out of AuthContext


  const getListing = () => {

    get(`/listings/details/${id}`)
    .then((response) => {

      console.log("Found Listing ===>", response.data)
      setListing(response.data)

      let thisAverage = response.data.reviews.reduce((accumulator, review) => accumulator + review.stars, 0)/response.data.reviews.length
      console.log("Average", thisAverage)
      if (thisAverage) {
        setAverage(thisAverage)
      }

    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  } //triggers new comment

  //triggers new review, inclusive of comment and stars
  const handleSubmit = (e) => {

    e.preventDefault()

    let newReview = {
      comment,
      stars,
      listing: id,
      tenant: user._id
    }

    post('/reviews/add-review', newReview)
    .then((response) => {
      console.log("Added review ===>", response.data)
      getListing()
      setComment('')
    })
    .catch((err) => {
      console.log(err)
    })

  }

  let reviewOwner = (review) => {
    return review.tenant._id === user._id
  }

  useEffect(() => {

    getListing()

  }, [id])
  
    return (
      <div>
        {listing && (
          <>
            <Link to={`/listings`}>Back to Listings</Link>
            {listing.imgUrl ? (
              <img src={listing.imgUrl} alt="property image" />
            ) : (
              <p>No image available</p>
            )}
            <h2>{listing.streetAddress}</h2>
            <h3>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(listing.price)}
            </h3>
            <Rating
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              initialValue={average}
              readonly={true}
              allowFraction={true}
            />
            <hr />
            <h3>Details</h3>
            <h4>{`Beds: ${listing.beds} | Baths: ${listing.baths}`}</h4>
            <p>{`${listing.neighborhood} | ${listing.borough} | ${listing.zipCode}`}</p>
            <p>{listing.phone}</p>
            <hr />
          </>
        )}

        <h3>Reviews from the Community</h3>
      
        {/* review form below */}
        <form onSubmit={handleSubmit}>
          <h2>Write a review</h2>
          <StarButton setStars={setStars} />

          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={handleComment}
          />

          <button type="submit">Post</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {user && listing && listing.reviews.length ? (
          <>
            {listing.reviews.map((review) => {
              return (
                <div key={review._id}>
                  <h3>{review.comment}</h3>
                  <p>{review.stars}</p>
                  <p>{review.tenant.name}</p>
                  {reviewOwner(review) && 
                    <Link to={`/reviews/edit-review/${review._id}`}>
                        <button>Edit</button>
                    </Link>}
                    {/* //onClick render EditReview component */}
                 
            
                  {reviewOwner(review) && 
                    <button>Delete</button>}
                    {/* //onClick render DeleteReview component */}



                </div>
              );
            })}
          </>
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    );
}

export default ListingDetails

// propType: String,
//        streetAddress: String,
//         neighborhood: String,
//         borough: String,
//         zipCode: Number,
//         beds: String,
//         baths: String,
//         lat: Number,
//         lon: Number,
//         price: Number,
//         voucherReceptive: String,
//         responsive: String,
//         contactDate: String,
//         listingSource: String,
//         phone: String,
//         imgUrl