//heart on a listing card

import { useState, useContext } from "react"
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { AuthContext } from "../context/auth.context"
import { ListingContext } from "../context/listing.context"
import { get } from "../services/authService"
import {motion} from "framer-motion"

//check npm package for the heroicons, not the heroicons site

const LikeButton = ({ singleListing, toggleCard }) => {
  const {user} = useContext(AuthContext)
  const { updateListing } = useContext(ListingContext)

  // const [saveModal, setSaveModal] = useState(false);

  // const toggleSaveModal = () => {
  //   setSaveModal(!saveModal)
  // }

  const returnLike = (listing) => {
    return listing.likes.some((like) => like === user?._id);
  };//returns true or false; do any of the listings have likes with id's that match the user's

  const toggleLike = (listing) => {

    console.log("Toggling", listing, user)

    if (!returnLike(listing)) {
      // if false, then add a like
      get(`/likes/add-like/${listing._id}`)
        .then((results) => {
          console.log("Added like", results.data);
          updateListing(results.data.listing); //passed in as a prop from Listings page; gets all the listings
          // window.alert("Saved to Profile!")
        })
        .catch((err) => {
          console.log(err);
        });
    } //otherwise, allow user to remove the like 
    else {
      get(`/likes/remove-like/${listing._id}`)
        .then((results) => {
          console.log("Removed", results.data);
          updateListing(results.data.listing);
          // window.alert("Unsaved from Profile!")
          toggleCard()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    //onclick, call the toggleLike function ('pass it down')
    <>
    {/* <button
        className="cursor-pointer hover:scale-150 duration-300 translation-all"
        onClick={() => 
          {toggleLike(singleListing);
          // toggleSaveModal()
          }}
      > */}
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => 
          {toggleLike(singleListing);
          // toggleSaveModal()
          }}
      >
      
        {returnLike(singleListing) ? (
          <HeartIconSolid
            style={{ color: "red" }}
            className="mx-2 h-8 w-8"
          />
      ) : (
        // <HeartIconSolid 
        //   style={{ color: "white" }}
        //   className="mr-1 h-5 w-5" 
        // />
        <HeartIconOutline 
          style={{ color: "red" }}
          className="mx-2 h-8 w-8" 
        />
      )}
    </motion.button>

  </>
  );
}

export default LikeButton




 {/* {showModal && (
    <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed transition-opacity"
          onClick={toggleSaveModal}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> */}
          {/* Modal content */}
          {/* <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="font-bold text-lg">Saved to Profile!</h3> */}
            {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
          {/* </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={toggleSaveModal}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div> */}
  {/* )}   */}