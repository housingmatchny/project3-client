//tenant profile page
//will show image url, buttons to link to personal and preferences (hold off on prefs) pages, reviews specific to this tenant, and liked listings

import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import ReviewCard from "../components/ReviewCard";
import ListingCard from "../components/ListingCard";
import StarButtonAverage from "../components/StarButtonAverage";
import Reviews from "./Reviews";

const TenantProfile = () => {
  const [tenantInfo, setTenantInfo] = useState(null);
  const { tenantId } = useParams();
  const { user, setUser, storeToken } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = () => {
    setErrorMessage("You haven't written any reviews.")
  }

  // let reviewOwner = (review) => {
  //   return review.tenant._id === user._id;
  // };

  const getTenantInfo = (tenantId) => {
    // if (tenantId) {
    get(`/profile/${tenantId}`)
      .then((response) => {
        console.log("Tenant info ==>", response.data);
        setTenantInfo(response.data.user);
        setUser(response.data.user);
        storeToken(response.data.authToken);
      })
      .catch((err) => {
        console.log(err);
      })
      // .finally(() => {
      //   console.log("Tenant info, line 41===>", tenantInfo.reviews)
      // })
    // } else {
    //   console.log("Invalid tenantId");
    // }
  };

  useEffect(() => {
    getTenantInfo(tenantId);
  }, [tenantId]);

  return (
    <div>
      <h3 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Your profile
      </h3>

      <hr className="my-4"/>
      <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Your reviews
      </h3>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-1/2 mx-auto">
        {tenantInfo && (
          <>
            {tenantInfo.reviews.length ? (
              <>
                {tenantInfo.reviews.map((review) => {
                  return (
                    <ReviewCard
                      key={review?._id}
                      singleReview={review}
                      getTenantInfo={getTenantInfo}
                      // updateReview={updateReview}
                    />
                  );
                })}
              </>
            ) : (
              <p>{handleError}</p>
            )}
          </>
        )}
      </div>
      <br />
      
      {/* Likes */}

      <hr className="my-4"/>
      <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Your saved listings
      </h3>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-1/2 mx-auto">
        {tenantInfo && (
          <>
            {tenantInfo.likes.length ? (
              <>
                {tenantInfo.likes.map((likedListing) => {
                  return (
                    // <StarButtonAverage overallRating={overallRating} />
                    <ListingCard
                      key={likedListing?._id}
                      singleListing={likedListing}
                      getTenantInfo={getTenantInfo}
                    />
                  );
                })}
              </>
            ) : (
              <p>No saved listings</p>
            )}
          </>
        )}
      </div>




      <div className="mx-auto text-center">
      <Link to={`/profile/personal/${tenantId}`}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Update personal information
        </button>
      </Link>
      </div>
    </div>
  );
};

export default TenantProfile;
