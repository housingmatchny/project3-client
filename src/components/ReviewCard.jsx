//Card for writing reviews: user can write comment and rate the stars; model after Yelp review card

import StarButton from "./StarButton"

//singleReview and updateReview destructured out of props; passed down from Reviews page
//shows the Star Button and comment; according to the Review model, each review has a comment key; remember, singleReview comes from Reviews, where singleReview={review}
//passes down singleReview and updateReview to the Star Button as props

const ReviewCard = ({ singleReview, updateReview }) => {
  return (
    <div>
      {/* <StarButton singleReview={singleReview} updateReview={updateReview} /> */}

      <p>{singleReview.comment}</p>
      <StarButton />
    </div>
  );
};


export default ReviewCard