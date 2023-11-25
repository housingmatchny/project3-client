//overall star rating (average of all ratings)

import { createContext, useState } from "react";

const StarContext = createContext();

function StarProviderWrapper({ children }) {
//   const [averageRating, setAverageRating] = useState(0);

    const overallRating = (singleListing) => {
        //if the listing has reviews (i.e., length), then you map through them, pull out each rating, and calculate the average
            return singleListing.reviews.length 
            ? singleListing.reviews.reduce(
                (accumulator, review) => accumulator + review.stars,
                0
            ) / singleListing.reviews.length
            : 0;
        }
        
  return (
    <StarContext.Provider value={{ overallRating }}>
      {children}
    </StarContext.Provider>
  );
}
//pass down to be consumed by descendants

export { StarProviderWrapper, StarContext };