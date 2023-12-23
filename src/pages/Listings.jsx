//all listings

import ListingCard from "../components/ListingCard";
import { useEffect, useContext, Component } from "react";
import { ListingContext } from "../context/listing.context";
import { Carousel } from "flowbite-react";
import BannerUser from "../components/BannerUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Listings = () => {
  const { listings, setListing, getListings } = useContext(ListingContext);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (!listings) {
      getListings();
    }
  }, []);

  return (
    <div>
      <BannerUser />

      {/* <h3 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your housing matches</h3> */}

      <div className="section-container my-10">
        <div className="subtitle">
          <h3 className="mx-12 text-left text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Browse listings & community reviews
          </h3>
        </div>
      </div>

      <Slider {...settings}>
      <div className="flex-row mb-8">
        {listings && listings.length ? (
          <div>
            {listings.map((listing) => (
              <div key={listing._id}>
                <ListingCard singleListing={listing} />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      </Slider>

    </div>
  );
};

export default Listings;
