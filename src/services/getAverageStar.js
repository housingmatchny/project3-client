export const getAverageStar = (listing) => {


    console.log("Star average attempt, listing is ===>", listing)

    let thisAverage = 0  //start with 0 so it's a number no matter what
   
    if (listing) {

     thisAverage = listing.reviews.length ? 
      (listing.reviews.reduce(
        (accumulator, review) => accumulator + review.stars,
        0
      ) / listing.reviews.length) : 0
   }

   return thisAverage

}