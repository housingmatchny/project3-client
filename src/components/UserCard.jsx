import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

const UserCard = ({handleNotFound}) => {

    const {tenantId} = useParams()
    const {user, setUser} = useContext(AuthContext)

  return (
    <>
    {user ? (
    <section className="user-profile-card">
      <div className="grid grid-cols-1 px-20 ml-4 lg:ml-12 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div className="flex flex-col items-center gap-4 pb-10">
           
              <div className="avatar placeholder mt-8">
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  <span className="text-3xl">{user.name[0].toUpperCase()}</span>
                </div>
              </div>

              <div className="username">
                <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {user.name}
                </h3>
              </div>

          <div className="overview-btn mt-6 border-t border-gray-100 divide-y divide-gray-100">
            <div className="mx-auto text-center">
              <Link to={`/profile/${user._id}`}>
              <p className="text-sm">Overview</p>  
              </Link>
                {/* <button
                  type="button"
                  className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover"
                >
                  Overview
                </button>
              </Link> */}
            </div>
          </div>

          <div className="edit-account-btn mt-6 border-t border-gray-100 divide-y divide-gray-100">
            <div className="mx-auto text-center">
              <Link to={`/profile/personal/${tenantId}`}>
                <p className="text-sm">Edit account</p> 
              </Link>
                {/* <button
                  type="button"
                  className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover"
                >
                  Edit account
                </button>
              </Link> */}
            </div>
          </div>

          <div className="update-prof-btn mt-6 border-t border-gray-100 divide-y divide-gray-100">
            <div className="mx-auto text-center">
              <Link to={`/profile/preferences/${tenantId}`}>
                <p className="text-sm">Update profile</p> </Link>
                {/* <button
                  type="button"
                  className="btn focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover"
                >
                  Update preferences
                </button>
              </Link> */}
            </div>
          </div>

        </div>
      </div>
    </section>) :
            <div>
            <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 mt-20">{handleNotFound}</h3>
            {/* <img src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?size=626&ext=jpg&ga=GA1.2.809125119.1703018205" alt="image of a laptop with no data to signify that we could not find the user's data to fill this page"/> */}
            </div>
          }
    </>
  );
}

export default UserCard