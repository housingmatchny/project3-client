import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io"
import apartment from "../assets/apartment.png"

const Banner = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/signin");
  };

  return (
    
    <div className="max-w-screen-2xl container mx-auto x1:px-24 px-4">
      <div className="mx-12 h-auto py-12 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* left-side text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {/* //   "md:text-5x1 text-4x1 font-primary font-bold mb-4 md:leading-normal leading:normal"> */}
            Your NYC affordable housing search, simplified.
            {/* Finding affordable housing in New York City can be hard. */}
            {/* Finding housing in New York City with a limited or fixed income can be hard. */}
            </h1>
            {/* <h1 className="text-4xl font-bold mt-8 tracking-tight text-gray-900 sm:text-4xl">
            We are here to help.
          </h1> */}

          <div className="my-8 ml-2">
            <p className=""><span className="font-semibold underline underline-offset-4">Sign up </span>and...</p>
            <br />
              <ol className="list-disc ml-8">
                <li>Browse listings and affordable housing programs in New York City</li>
                <li>Match to programs that could help you afford rent (if eligible)</li>
                <li>Read and post reviews so that we can be there for one another</li>
              </ol>
            <br />
            <p>Our service is free!  So, what are you waiting for?</p>  
          </div>

          <button
            className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleSubmit}
          >
            Get Started <IoIosArrowForward />
          </button>
        </div>

        {/* right-side image */}
        <div className="md:w-1/2">
            <img src={apartment} alt="Picture of apartments"></img>
            {/* <p className="text-sm">Source: Kit8</p> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
