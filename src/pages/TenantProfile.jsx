//tenant profile page
//will show image url, buttons to link to personal and preferences (hold off on prefs) pages, reviews specific to this tenant, and liked listings

import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import ReviewCard from "../components/ReviewCard";
import ListingCard from "../components/ListingCard";
import UserCard from "../components/UserCard";
import CountUp from 'react-countup'


const TenantProfile = () => {
  const [tenantInfo, setTenantInfo] = useState(null);
  const { tenantId } = useParams();
  const { user, setUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null)
  const [erroroundMessage, setErrorFoundMessage] = useState(null)

  const handleError = () => {
    setErrorMessage("You haven't written any reviews.")
  }

  const handleNotFound = () => {
    setErrorFoundMessage("User not found.")
  }

  const getTenantInfo = (tenantId) => {
    get(`/profile/${tenantId}`)
      .then((response) => {
        console.log("Tenant info ==>", response.data);
        setTenantInfo(response.data.user);
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const toggleCard = (i) => {
    console.log("This is our unliked index", i)
    let newLikes = [...tenantInfo.likes]
    console.log("Likes as found", newLikes)
    newLikes.splice(i, 1)
    console.log("New Likes===>", i, newLikes)
    setTenantInfo((prev) => ({...prev, likes: newLikes}))
  }

  const current = new Date()
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;



  useEffect(() => {
    getTenantInfo(tenantId);
  }, [tenantId]);

  return (
    // whole page
    <div className="flex flex-col items-center mt-24 lg:mt-40 gap-10 min-h-screen lg:flex-row lg:justify-between lg:gap-20 lg:items-start">
      
      {/* left side */}
      <div className="lg:w-1/3 mr-10">
        <UserCard />
      </div>

      {/* right side */}
      <div className="flex flex-col justify-center lg:w-2/3">
        <>
        {tenantInfo ? (
          <section className="milestones flex flex-col gap-4 justify-center items-center mb-10">
            <header>
              <h3 className="text-center text-1xl font-semibold tracking-normal text-gray-900 dark:text-white">
              My Milestones <span aria-label="let's celebrate">🎉</span>
              <br />
              </h3>
              <p className="text-center text-sm tracking-tight text-gray-900 dark:text-white md:mr-6">As of {date}</p>
            </header>
            
            <div className="stats stats-vertical lg:stats-horizontal shadow text-center w-1/2 justify-center">

              <div className="stat">
                <div className="stat-title">Matches Liked</div>
                <div className="stat-value">
                  <CountUp end={tenantInfo.likes.length} delay={0.2} />
                </div>
                {/* <div className="stat-desc">Jan 1- Feb 1</div> */}
              </div>

              <div className="stat">
                <div className="stat-title">Reviews Written</div>
                <div className="stat-value">
                  <CountUp end={tenantInfo.reviews.length} delay={0.2} />
                </div>  
          
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>
            </div>
          </section>
        ):({setErrorFoundMessage} && <h5 className="text-center text-1xl font-normal tracking-tight text-gray-900 dark:text-white">{handleNotFound}</h5>
        )}
        </>

        <section className="liked-listings mb-10">
          <header>
            <h3 className="text-center text-1xl font-semibold tracking-tight bg-white text-gray-900 dark:text-white">
              My Liked Matches
            </h3>
          </header>

          <div className="flex flex-col w-1/2 lg:grid-cols-3 lg:w-1/4 lg:h-1/2 gap-8 my-6 justify-center items-center mx-auto">
         
          {/* <div className="px-4 py-6 gap-8 md:grid md:grid-flow-row md:grid-cols-2 md:gap-80 md:px-0 md:w-1/2 md:justify-center md:items-center mx-auto"> */}
            {/* if we take away flex flex-col, the div's flex flex-col will take over, despite the md:flex-row setting */}
            {tenantInfo && (
              <>
                {tenantInfo.likes.length ? (
                  <>
                    {tenantInfo.likes.map((likedListing, i) => {
                      return (
                     
                        <ListingCard
                          key={likedListing?._id}
                          singleListing={likedListing}
                          getTenantInfo={getTenantInfo}
                          toggleCard={() => toggleCard(i)}
                          // onClick={() => toggleCard(i)}
                        />
                      );
                    })}
                  </>
                ) : (
                  <h5 className="text-center text-1xl font-normal tracking-tight text-gray-900 dark:text-white">
                    No liked matches yet.  Get started at <Link to="/listings" className="link text-blue-600">Matches</Link>.
                  </h5>
                )}
              </>
            )}
          </div>
        </section>

        <section className="reviews mb-10">
          <header>
          <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            My Reviews
          </h3>
          </header>

          <div className="px-4 py-6 md:grid md:grid-cols-3 md:gap-4 md:px-0 w-1/2 mx-auto">
            {/* shows as column on iPhone SE b/c the whole div is flex-col */}
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
                ) : ({errorMessage} &&
                  <h5 className="text-center text-1xl font-normal tracking-tight text-gray-900 dark:text-white">
                    {handleError}
                  </h5>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default TenantProfile;
