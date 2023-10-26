// // toggle between solid or default (empty) icon - used for hearts and stars
// keeping it here for reference on using context

// import { createContext, useState } from "react";

// const RatingContext = createContext();

// function RatingWrapper({ children }) {
//   const [rating, setRating] = useState('empty')

//   const toggleRating = () => {
//     if (rating === 'solid') {
//         setRating('empty') 
//     } else {
//         setRating('solid')
//     }
//   }

//   return (
//     <RatingContext.Provider value={{ rating, toggleRating }}>
//       {children}
//     </RatingContext.Provider>
//   )
// }
// //pass down rating and toggleRating to be exported and consumed by descendants

// export { RatingWrapper, RatingContext };
