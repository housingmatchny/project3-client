//all listings

import ListingCard from "../components/ListingCard";
import LoadingError from "../components/LoadingError";
import React, { useEffect, useContext, Component, useState } from "react";
import { ListingContext } from "../context/listing.context";
import BannerUser from "../components/BannerUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SuccessAlert from "../components/SuccessAlert";
import TinderCard from "react-tinder-card";
import Carousel from "nuka-carousel";
import { useSprings, animated, to as interpolate } from "@react-spring/web";


const Listings = () => {
  const [lastDirection, setLastDirection] = useState();
  const { listings, setListing, getListings } = useContext(ListingContext);

  const slider = React.useRef(null);

  const swiped = (direction, listingToDelete) => {
    console.log("removing: " + listingToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (listing) => {
    console.log(listing + " left the screen!");
  };

  // const handleAlert = () => {
  //   window.alert(SuccessAlert)
  // }

  // useEffect(() => {
  //   if (!listings) {
  //     getListings();
  //   }
  // }, []);

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
    speed: 500,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },

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

  // const trans = (r, s) =>
  // `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

  return (
    <>
      {/* <BannerUser /> */}

      {/* carousel only shows up when we use flex flex-col justify-center; doesn't work with flex and/or items-center */}
      <div className="min-h-screen flex flex-col w-screen mx-auto">
        <section className="header items-center gap-4 mb-2">
          <div className="subtitle">
            <h3 className="mt-24 mx-12 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {/* Browse listings & community reviews */}
              {/* Browse my matched listings & the community's reviews */}
              {/* My housing matches */}
              Recommended for you
            </h3>
            <h5 className="mx-12 mt-4 text-center text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              Swipe left to right, Click the heart icon to save
            </h5>
          </div>
        </section>

      
        {/* <section className="mx-7 translate-x-0 md:translate-x-71 lg:translate-x-96"> */}
        <section className="relative w-300 min-h-screen items-center translate-x-0 md:mx-14 md:translate-x-71 lg:translate-x-96">
          {listings && listings.length ? (
            <>
            {listings.slice(0,5).map((listing) => (
              <TinderCard
              className="absolute md:w-full md:h-full cursor-grab"
              key={listing._id}
              onSwipe={(dir) => swiped(dir, listing.streetAddress)}
              onCardLeftScreen={() => outOfFrame(listing.streetAddress)}
              >
                <ListingCard key={listing._id} singleListing={listing} />
              </TinderCard>
                ))}
            </>
          ) : (
            <LoadingError />
          )}
        </section>

        {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
      </div>
    </>
  );
};

export default Listings;


{/* TinderCard */}
        {/* <div className="cardContainer absolute w-300 h-200 will-change-transform flex items-center justify-center touch-action-none">
          <div className="bg-white bg-center bg-no-repeat w-45vh max-w-150 h-85vh max-h-285 will-change-transform rounded-xl">
            {listings &&
              listings.length &&
              listings.map((listing) => (
                <TinderCard
                  className="swipe"
                  key={listing._id}
                  onSwipe={(dir) => swiped(dir, listing.streetAddress)}
                  onCardLeftScreen={() => outOfFrame(listing.streetAddress)}
                >
                  <ListingCard key={listing._id} singleListing={listing} />
                </TinderCard>
              ))}
          </div>
        </div> */}

    // Nuka carousel: <Carousel slidesToShow={1} cellAlign="center" dragging={true}></Carousel>

    // React slick carousel: <Slider {...settings}> map through listings: <ListingCard key={listing._id} singleListing={listing} /> </Slider>
    //note: slider does not load in flex b/c there is already a flex in the containing div above

    {/* With w-auto so that the card filled the full page: <section className="translate-x-0 md:translate-x-71 lg:translate-x-96 w-auto mb-20"> */}
    