//update personal account information
//pull form example from ListingDetails and EditReview pages

import { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, put, axiosDelete } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const TenantPersonal = () => {
  const [tenantInfo, setTenantInfo] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { user, setUser, storeToken, removeToken } = useContext(AuthContext);

  const navigate = useNavigate()

  const { tenantId } = useParams(); //tenantId extracted from URL parameters

  const getTenantInfo = (tenantId) => {
    get(`/profile/${tenantId}`)
      .then((response) => {
        console.log("Tenant info ==>", response.data);
        setTenantInfo(response.data.user); //if you look at the response.data body of TenantInfo, you'll see user as a key
        setUser(response.data.user); //from Context
        // storeToken(response.data.authToken);
        // console.log("Name ==>", response.data.user.name)
        setName(response.data.user.name)
        setEmail(response.data.user.email)
        setPassword(response.data.user.password)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let updatedProfile = {
      name,
      email,
      password,
      tenant: user._id,
    };
    //send updated profile to the API endpoint; if successful, .then block will execute: retrieve updated tenant info by id
    put(`/profile/personal/${tenantId}`, updatedProfile)
      .then((response) => {
        console.log("Updated profile ===>", response.data);
        // console.log("TenantId before getTenantInfo:", tenantId);
        getTenantInfo(response.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const deleteProfile = () => {
    // Make a DELETE request to delete the profile
    axiosDelete(`/profile/delete/personal/${tenantId}`)
      .then((response) => {
        console.log("Deleted profile ===>", response);
        // Once the delete request is resolved successfully
        // navigate back to Home page.
        removeToken()
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log("State after update:", { name, email, password });
    getTenantInfo(tenantId);
  }, [tenantId]); //tenantId is a dependency for useEffect; triggers useEffect when tenantId changes

  return (
    <>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Please feel free to edit!
          </p>
        </div>

        {tenantInfo && (
          <form onSubmit={handleFormSubmit}>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:col-span-1"
              >
                Full Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleName}
                  className="block w-4/5 shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:col-span-1"
              >
                Email
              </label>

              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  className="block w-4/5 shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 sm:col-span-1"
              >
                Password
              </label>

              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  className="block w-4/5 shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit changes</button>
          </form>
        )}
       
        <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={deleteProfile}>Delete account</button>
      </div>
    </>
  );
};

export default TenantPersonal;

{
  /* import { PaperClipIcon } from '@heroicons/react/20/solid'

// export default function Example() { */
}
{
  /* //   return (
//     <div>
//       <div className="px-4 sm:px-0">
//         <h3 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
//         <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Please feel free to edit!</p>
//       </div>

//       <div className="mt-6 border-t border-gray-100">
//         <dl className="divide-y divide-gray-100">

//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tenantInfo.name}</dd>
//           </div>
//           
//           
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">m{tenantInfo.email}</dd>
//           </div>

//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">Password</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">m{tenantInfo.password}</dd>
//           </div>


//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
//               qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
//               pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
//             </dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
//             <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
//               <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
//                 <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
//                   <div className="flex w-0 flex-1 items-center">
//                     <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
//                       <span className="truncate font-medium">resume_back_end_developer.pdf</span>
//                       <span className="flex-shrink-0 text-gray-400">2.4mb</span>
//                     </div>
//                   </div>
//                   <div className="ml-4 flex-shrink-0">
//                     <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                       Download
//                     </a>
//                   </div>
//                 </li>
//                 <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
//                   <div className="flex w-0 flex-1 items-center">
//                     <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//                     <div className="ml-4 flex min-w-0 flex-1 gap-2">
//                       <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
//                       <span className="flex-shrink-0 text-gray-400">4.5mb</span>
//                     </div>
//                   </div>
//                   <div className="ml-4 flex-shrink-0">
//                     <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                       Download
//                     </a>
//                   </div>
//                 </li>
//               </ul>
//             </dd>
//           </div>
//         </dl>
//       </div>
//     </div>
//   )
// } */
}
