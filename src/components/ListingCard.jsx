// ListingCard - features single listing with the updated like.  This is not the listing detail, though!  We link to details through the Listings page

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import StarButtonAverage from "./StarButtonAverage";
import { Card } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { Rating } from "react-simple-star-rating";
import { StarContext } from "../context/star.context";
import { ListingContext } from "../context/listing.context";
import { getAverageStar } from "../services/getAverageStar";

//updateListing => updates listing with likes
//cannot pass overallRating from Listing Details; ListingCard is not under Listing Details in the component tree; therefore we define the function here and pass it down to StarButton Average to show up in the Tenant Profile page
//singleListing, updateListing from Listings
const ListingCard = ({ singleListing, toggleCard }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">

      <div className={`rating gap-1 absolute right-2 top-2 p-4 bg-purple-700`}>
      <LikeButton singleListing={singleListing} toggleCard={toggleCard} />
      </div>

      <figure>
        <img src={singleListing.imgUrl} alt="Property Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{singleListing.streetAddress}</h2>
        <p>{singleListing.borough}</p>
        <StarButtonAverage overallRating={getAverageStar(singleListing)} />

      <div className="card-action justify-between items-center mt-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(singleListing.price)}{" "}
          per month
        </h3>

        <Link className="rounded-lg bg-purple-700 px-5 py-4 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" to={`/listings/details/${singleListing._id}`} key={singleListing?._id}> See details </Link>

      </div>
      </div>
    </div>

    // {/* <Card>
    //   <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
    //     <div className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 translation-all">
    //        <img className="p-5 rounded-lg w-96 h-48" src={singleListing.imgUrl} alt="property image" />

    //         <h5 className="mt-5 space-y-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
    //           <p>
    //           {singleListing.streetAddress}
    //           </p>
    //         </h5>
    //         <p>{singleListing.borough}</p>

    //         <StarButtonAverage overallRating={getAverageStar(singleListing)} />

    //         <div className="flex space-x-4 mt-12">
    //           <h3 className="text-xl font-bold text-gray-900 dark:text-white">
    //             {new Intl.NumberFormat("en-US", {
    //                   style: "currency",
    //                   currency: "USD",
    //                   maximumFractionDigits: 0,
    //                 }).format(singleListing.price)} per month
    //           </h3>
    //           <Link className="rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" to={`/listings/details/${singleListing._id}`} key={singleListing?._id}> See details </Link>

    //         </div>

    //         <LikeButton singleListing={singleListing} toggleCard={toggleCard} />
    //         </div>
    //       </div>
    //     </Card> */}

    // PROJECT3 CARD
    // <Card>
    // <div className="flex flex-col items-center justify-center cursor-pointer hover:-translate-y-4 duration-300 translation-all">
    //    <img className="object-scale-down h-auto max-w-md drop-shadow-md rounded-md m-auto" src={singleListing.imgUrl} alt="property image" />

    //     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
    //       <p>
    //       {singleListing.streetAddress}
    //       </p>
    //     </h5>
    //     <p>{singleListing.borough}</p>

    //     <StarButtonAverage overallRating={getAverageStar(singleListing)} />

    //     <div className="flex space-x-20">
    //       <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
    //         {new Intl.NumberFormat("en-US", {
    //               style: "currency",
    //               currency: "USD",
    //               maximumFractionDigits: 0,
    //             }).format(singleListing.price)} per month
    //       </h3>
    //       <Link className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" to={`/listings/details/${singleListing._id}`} key={singleListing?._id}> See details </Link>

    //     </div>

    //     <LikeButton singleListing={singleListing} toggleCard={toggleCard} />
    //     </div>
    // </Card>

    // SOURCE FOR PROJECT3 CARD from flowbite; responsive
    // {/* <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //     <a href="#">
    //         <img class="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
    //     </a>
    //     <div class="px-5 pb-5">
    //         <a href="#">
    //             <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
    //         </a>
    //         <div class="flex items-center mt-2.5 mb-5">
    //             <div class="flex items-center space-x-1 rtl:space-x-reverse">
    //                 <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //                 </svg>
    //                 <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //                 </svg>
    //                 <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //                 </svg>
    //                 <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //                 </svg>
    //                 <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //                 </svg>
    //             </div>
    //             <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
    //         </div>
    //         <div class="flex items-center justify-between">
    //             <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    //             <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
    //         </div>
    //     </div>
    // </div> */}
  );
};

export default ListingCard;
