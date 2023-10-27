// ListingCard - features single listing with the updated like.  This is not the listing detail, though!  We link to details through the Listings page

import {useState, useContext} from "react"
import {Link} from "react-router-dom"
import LikeButton from "./LikeButton"
import StarButtonAverage from "./StarButtonAverage"
import { Card } from 'flowbite-react';
import { Carousel } from 'flowbite-react';
import { Rating } from 'react-simple-star-rating'

//updateListing => updates listing with likes
//props passed down from Listings and Listing Details
//singleListing => 'listing' in ListingDetails
const ListingCard = ({ singleListing, updateListing }) => {
  
  // const [rating,setRating] = useState('')

  return (
    // <Carousel slide={false}>
    <Card>
    <div className="flex flex-col items-center justify-center">
       {<img className="object-scale-down h-auto max-w-md drop-shadow-md rounded-md m-auto" src={singleListing.imgUrl} alt="property image" />}
        
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <p>
          {singleListing.streetAddress}
          </p>
        </h5>
        <p>{singleListing.borough}</p>
        {/* brought average formula here */}
        <StarButtonAverage overallRating={(singleListing.reviews.reduce(
            (accumulator, review) => accumulator + review.stars,
            0
          ) / singleListing.reviews.length)} />
        <div className="flex space-x-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(singleListing.price)} per month
          </h3>
          <Link className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" to={`/listings/details/${singleListing._id}`} key={singleListing?._id}> See details </Link>

        </div>
        
        <LikeButton singleListing={singleListing} updateListing={updateListing}/>
        </div>
    </Card>
    // </Carousel>
)
}

export default ListingCard


{/* <Rating
emptyStyle={{ display: "flex" }}
      fillStyle={{ display: "-webkit-inline-box" }}
      initialValue={average}
      readonly={true}
      allowFraction={true}
    /> */}

    {/*    
           {singleListing.imgUrl ? (
              <img src={singleListing.imgUrl} alt="property image" />
              ) : (
                <p>No image available</p>
                )}
              > */}


    // <Card
    //   imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
    //   imgSrc="/images/products/apple-watch.png"
    // >
    //   <a href="#">
    //     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
    //       <p>
    //         Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
    //       </p>
    //     </h5>
    //   </a>
    //   <div className="mb-5 mt-2.5 flex items-center">
    //     <SeeSourceCodeForSVG />
    //     <SeeSourceCodeForSVG />
    //     <SeeSourceCodeForSVG />
    //     <SeeSourceCodeForSVG />
    //     <SeeSourceCodeForSVG />
    //     <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
    //       <p>
    //         5.0
    //       </p>
    //     </span>
    //   </div>
    //   <div className="flex items-center justify-between">
    //     <span className="text-3xl font-bold text-gray-900 dark:text-white">
    //       $599
    //     </span>
    //     <a
    //       className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
    //       href="#"
    //     >
    //       <p>
    //         Add to cart
    //       </p>
    //     </a>
    //   </div>
    // </Card>
  


