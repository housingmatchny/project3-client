//context to store all listings, obtain an individual listing, and access the star overall rating

import { createContext, useState, useEffect, useContext } from "react";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";

const ListingContext = createContext();

function ListingProviderWrapper({ children }) {  

  const [listings, setListings] = useState(null);
  const [listing, setListing] = useState(null);
  const [average, setAverage] = useState(0);

  // const { id } = useParams(); //listing id out of params

  const { user } = useContext(AuthContext); 
  
  const getListings = () => {

    get('/listings')
    .then((response) => {
      console.log("Listing Context, All listings ====>", response.data)
      setListings(response.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  // useEffect(() => {

  //   getListings()

  //   }, []
  // )

   //alternative to useParams; can't pull id from params in context; context is not a page component so not advisable to pull id from params
   //returns the single listing that matches the id that was passed in 
  
  const getListing = (id) => {
    console.log("Id ==>", id)
    let thisListing;
    let theseListings
    let thisAverage;
    if (listings) {
      theseListings = [...listings]
      thisListing = theseListings.find((listing) => listing._id === id);
      if (thisListing) {
        setListing(thisListing);
        thisAverage = thisListing.reviews.length
          ? thisListing.reviews.reduce(
              (accumulator, review) => accumulator + review.stars,
              0
            ) / thisListing.reviews.length
          : 0;
          setAverage(thisAverage);
      }  
    } else {
      getListings()
      get(`/listings/details/${id}`)
      .then((response) => {
        console.log("Found Listing ===>", response.data);
        setListing(response.data);

      let thisListing = listings.find(listing => listing._id === id)

        let thisAverage =
          thisListing.reviews.reduce(
            (accumulator, review) => accumulator + review.stars,
            0
          ) / response.data.reviews.length;
        console.log("Average", thisAverage);

          setAverage(thisAverage);
        
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    })
      .catch((err) => {
        console.log(err);
      });    


  }
  }

  const updateListing = (newListing) => {

    console.log("New listing", newListing)
    
    let newArray = [...listings]
    
    let listingIndex = newArray.findIndex(element => element._id === newListing._id)
  
    console.log("Index position ===>", listingIndex)

    newArray[listingIndex] = newListing //substitute the new listing object at newArray(index position)
    // e.g., newArray[0] = newListing

    console.log("Line 76", newArray)

    setListings(newArray)  //update listings state with newArray which contains new listing with the like or unlike

  }

  
 
  // const getListing = () => {
  //   get(`/listings/details/${id}`)
  //     .then((response) => {
  //       console.log("Found Listing ===>", response.data);
  //       setListing(response.data);

  //       let thisAverage =
  //       response.data.reviews.length ? 
  //         (response.data.reviews.reduce(
  //           (accumulator, review) => accumulator + review.stars,
  //           0
  //         ) / response.data.reviews.length) : 0
  //       console.log("Average", thisAverage);
  //       if (thisAverage) {
  //         setAverage(thisAverage);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //updates comment state variable with new input
  // const handleComment = (e) => {
  //   setComment(e.target.value);
  // };

  let reviewOwner = (review) => {
    return review.tenant._id === user._id;
  }; //returns true or false whether the tenant id of the review object matches the user id (i.e., whether this person owns the review)


  // useEffect(() => {
  //   getListing(); //retrieve listing detail whenever the id changes
  //   console.log("From Listing Context, Single Listing ===>", listing)
  // }, []);

  useEffect(() => {

    getListings()

    }, []
  )

  return (
    <ListingContext.Provider
      value={{ listings, setListings, listing, setListing, average, setAverage, getListings, getListing, reviewOwner, updateListing}} >
      {children}
    </ListingContext.Provider>
  );
}
//pass down to be consumed by descendants

export { ListingProviderWrapper, ListingContext };
