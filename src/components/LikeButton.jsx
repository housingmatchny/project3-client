//heart on a listing card

import { useState, useContext } from "react"
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { AuthContext } from "../context/auth.context"
import { get } from "../services/authService"


const LikeButton = ({singleListing, updateListing}) => {
  const {user} = useContext(AuthContext)

  const returnLike = (listing) => {
    return listing.likes.some((like) => like === user?._id);
  };//returns true or false; do any of the listings have likes with id's that match the user's

  const toggleLike = (listing) => {

    if (!returnLike(listing)) {
      // if false, then add a like
      get(`/likes/add-like/${listing._id}`)
        .then((results) => {
          console.log("Added like", results.data);
          updateListing(); //passed in as a prop from Listings page; gets all the listings
        })
        .catch((err) => {
          console.log(err);
        });
    } //otherwise, allow user to remove the like 
    else {
      get(`/likes/remove-like/${listing._id}`)
        .then((results) => {
          console.log(results.data);
          updateListing();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    //onclick, call the toggleLike function ('pass it down')
    <button onClick={() => toggleLike(singleListing)}>
      {returnLike(singleListing) ? (
        <HeartIconSolid
          style={{ color: "red" }}
          className="mr-1 h-5 w-5 text-danger"
        />
      ) : (
        <HeartIconOutline 
          className="mr-1 h-5 w-5 text-danger" 
        />
      )}
    </button>
  );
}

export default LikeButton