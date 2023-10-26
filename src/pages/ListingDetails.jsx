import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { get, post } from '../services/authService';
import { AuthContext } from '../context/auth.context';
import LikeButton from "../components/LikeButton";
import ReviewCard from '../components/ReviewCard';
import StarButton from '../components/StarButton';
import { Rating } from 'react-simple-star-rating'

const ListingDetails = () => {

  const [listing, setListing] = useState(null)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [stars, setStars] = useState(0)
  const [average, setAverage] = useState(0)
  
  const { id } = useParams()

  const { user } = useContext(AuthContext)


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
  }

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

    {
      listing &&
      
      <>

        <h3>{listing.neighborhood}</h3>
         <Rating emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }} 
         initialValue={average}
         readonly={true}
         allowFraction={true}

         />

      </>


    }
    {/* //add review form */}
      <form 
      onSubmit={handleSubmit}
      >
        <StarButton setStars={setStars} />
        
        <label>Comment:</label>
        <input type="text" name="comment" value={comment} onChange={handleComment}/>

        {/* <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        /> */}


        <button type="submit">Post</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {user && listing && listing.reviews.length ?
      
      <>
        {
          listing.reviews.map((review) => {
            return (
              <div>
                <h3>{review.comment}</h3>
                <p>{review.stars}</p>
                <p>{review.tenant.name}</p>  
                {
                  reviewOwner(review) && <button>Edit Review</button>
                }          
                {
                  reviewOwner(review) && <button>Delete Review</button>
                }          
              </div>
            )
          })
        }
      </>

      : <p>No reviews yet</p>

      }
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