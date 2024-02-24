//banner for logged in users -- decided not to use

import { useNavigate } from "react-router-dom";
import apartment from "../assets/apartment.png";
import Listings from "../pages/Listings";

const BannerUser = () => {
  // const navigate = useNavigate();

  // const handleSubmit = () => {
  //     navigate("/signin");
  // };

  return (
    <>
      <section className="banner">
        <div className="max-w-screen-2xl container mx-auto x1:px-24 px-4">
          <div className="mx-12 py-12 flex flex-col md:flex-row justify-between items-center gap-10 h-auto">
            {/* left-side text */}
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your NYC affordable housing search, simplified.
              </h1>
              <div className="container mx-2 mt-8 justify-between items-start md:flex-row md:gap-10 gap-10">
                <button className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm text-start h-auto px-8 py-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mb-2 mr-4">
                  Browse listings and reviews
                </button>

                <button className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm text-start h-auto px-8 py-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mb-2">
                  Browse programs to help pay for rent
                </button>
              </div>
            </div>

            {/* right-side image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src={apartment}
                alt="Picture of apartments"
                className="mx-auto max-w-full h-auto"
              />
              {/* <p className="text-sm">Source: Kit8</p> */}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="listings">
        <h1>Browse listings</h1>
        <Listings />

      </section>
      <section className="programs">
        <h1>
          Learn about programs that could help you afford rent in New York City
        </h1>

        <h2>
          For faster results, take a quiz and get matched to affordable housing
          programs!
        </h2>
        <button className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Take quiz
        </button>
      </section>

      <section className="faq">
        <h1>Frequently Asked Questions</h1>
      </section> */}
    </>
  );
};

export default BannerUser;
