import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h2>1 out of 4 domestic violence survivors in the U.S. will remain homeless after leaving an emergency shelter.  We're on a mission to change that.</h2>
      <Link to='/signup'>
        <button> Get started </button>
      </Link>
    </div>
  )
}

export default Home

//source: Stylianou, A. M., & Pich, C. (2019). Beyond domestic violence shelter: Factors associated with housing placements for survivors exiting emergency shelters. Journal of Interpersonal Violence, 1-23.