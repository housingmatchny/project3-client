//all listings

import ListingCard from "../components/ListingCard";
import React, { useEffect, useContext, Component } from "react";
import { ListingContext } from "../context/listing.context";
import BannerUser from "../components/BannerUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SuccessAlert from "../components/SuccessAlert";

const Listings = () => {
  const { listings, setListing, getListings } = useContext(ListingContext);

  const slider = React.useRef(null)

  // const handleAlert = () => {
  //   window.alert(SuccessAlert)
  // }

  
  useEffect(() => {
    if (!listings) {
      getListings();
    }
  }, []);

  const settings = {
    // dots: false,
    // infinite: false,
    // speed: 500,
    // slidesToShow: 3,
    // slidesToScroll: 3,
    // initialSlide: 0,
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      swipeToSlide: true,
      speed:500,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        )},

    //   responsive: [
    //   {
    //     //laptop (lg)=1024;desktop (max-xl)=1280
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: false,
    //     },
    //   },
    //   {
    //     //tablet (sm): 640px
    //     breakpoint: 640,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };


  return (
    <div>
      {/* <BannerUser /> */}

      <div className="flex flex-col justify-center min-h-fit mt-20">
        <section className="header my-10">
          <div className="subtitle">
            <h3 className="mx-12 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {/* Browse listings & community reviews */}
              {/* Browse my matched listings & the community's reviews */}
              My Housing Matches
            </h3>
            <h5 className="mx-12 mt-4 text-center text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              Swipe left to right
            </h5>
          </div>
        </section>

        {/* <div className="stack">
          <div className="text-center border border-base-content card w-36 bg-base-100">
            <div className="card-body">A</div>
          </div>
          <div className="text-center border border-base-content card w-36 bg-base-100">
            <div className="card-body">B</div>
          </div>
          <div className="text-center border border-base-content card w-36 bg-base-100">
            <div className="card-body">C</div>
          </div>
        </div> */}
      
      {/* <div className="flex justify-center">: slider does not load in flex b/c there is already a flex above*/}
        <section className="lg:transform translate-x-1/3 w-auto mb-20">
          
            {listings && listings.length ? (
              <Slider {...settings}>
              {listings.map((listing) => (
                <ListingCard key={listing._id} singleListing={listing} />
              ))}
              </Slider>) : (
              <div className="flex flex-col gap-4 w-52 mt-20">
                <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                  Loading...
                  <br />
                </h3>

                {/* skeleton */}
                {/* <div className="skeleton h-32 w-full"></div> */}
                <div className="skeleton h-4 w-28 mb-4"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
              </div>
            )}
        </section>
      {/* </div> */}
      </div>
      </div>
  
  );
};

export default Listings;
