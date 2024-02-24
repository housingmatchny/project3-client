//Listing Card with rotation
//cannot import react-spring/hooks; keeps showing errors

import { animated, interpolate } from "react-spring/hooks";
import LikeButton from "./LikeButton";
import Carousel from "nuka-carousel";

const Card = ({ i, x, y, rot, scale, trans, bind, singleListing, toggleCard }) => {

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="card">
          <Carousel>
          <figure>
            <img src={singleListing.imgUrl} alt="Property Image" />
          </figure>
          </Carousel>
          <div className="card-body">
            <h2 className="card-title relative">{singleListing.streetAddress}</h2>
            <p>{singleListing.borough}</p>
            <div className="absolute right-2 p-4">
              {/* //removed top-2 from above */}
              <LikeButton singleListing={singleListing} toggleCard={toggleCard} />
            </div>
        </div>

         
          



        </div>
      </animated.div>
    </animated.div>
  );
};


export default Card