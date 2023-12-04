//tried to create deleteReview service but it kept breaking

// import { axiosDelete } from "./authService";
// import { useContext } from "react";
// import { ListingContext } from "../context/listing.context";

// export const deleteReview = (reviewId) => {
//   const { updateListing } = useContext(ListingContext);
// EXPLANATION ==> you can only use useContext in components, not in services, hence this did not work

//   axiosDelete(`/reviews/delete-review/${reviewId}`)
//     .then((response) => {
//       console.log("Deleted ===>", response);
//       updateListing(response.data.updatedListing);
//       // Once the delete request is resolved successfully, navigate back to the listing details or profile page.
//       // navigate(0);
//     })
//     .catch((err) => console.log(err));
// };
