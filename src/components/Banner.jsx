import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io"
import apartment from "../assets/apartment.png"

const Banner = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/signup");
  };

  return (
    
    // <div className="max-w-screen-2xl container mx-auto x1:px-24 px-4 mt-20 md:mt-40">
    <div className="h-screen w-screen mx-auto mt-20">
      <div className="mx-12 h-auto py-12 flex flex-col justify-start items-center gap-10 md:flex-row md:justify-between">
        {/* left-side text */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {/* //   "md:text-5x1 text-4x1 font-primary font-bold mb-4 md:leading-normal leading:normal"> */}
            {/* Your Yelp for affordable housing in New York City. */}
            Your NYC affordable housing search, simplified.
            {/* Finding affordable housing in New York City can be hard. */}
            {/* Finding housing in New York City with a limited or fixed income can be hard. */}
            </h1>
            {/* <h1 className="text-4xl font-bold mt-8 tracking-tight text-gray-900 sm:text-4xl">
            We are here to help.
          </h1> */}

          <div className="my-8">
            <p className="mb-4"><span className="font-semibold">Join a growing community to</span></p>
            {/* <p className="mb-4"><span className="font-semibold underline underline-offset-4">Join a growing community to</span></p> */}
              <ol className="list-disc ml-8">
                {/* <li>Browse listings by their responsiveness, affordability, and more</li> */}
                {/* <li>Match to programs that could help you afford rent (if eligible)</li> */}

                <li>Receive property matches in NYC</li>
                <li>Read and post reviews</li>
                <li>And more!</li>
                {/* <li>All for <span className="font-semibold">free</span>!</li> */}
              </ol>
            {/* <p>Our service is free!  So, what are you waiting for?</p>  */}
          </div>

          
          <button
            className="btn w-48 focus:outline-none tracking-tight text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleSubmit}
          >
            Get started for free <IoIosArrowForward />
          </button>
        </div>

        {/* right-side image */}
        <div className="md:w-1/2">
            <img src={apartment} alt="Illustration of apartments"></img>
            {/* <p className="text-sm">Source: Kit8</p> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
