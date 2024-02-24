import { get, put, axiosDelete } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { useState, useContext } from "react";
import UserCard from "../components/UserCard";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import FreeInput from "../components/FreeInput";
import Calendar from 'react-calendar'



const TenantPreferences = () => {
  const{user,setUser} = useContext(AuthContext)


  return (
  //whole page
    <div className="flex flex-col items-center mt-24 lg:mt-40 lg:justify-between gap-8 min-h-screen lg:flex-row lg:gap-48 lg:items-start mr-4 lg:mr-12">

      {/* left side */}
      <div className="lg:w-1/3">
          <UserCard />
        </div>
      
      {/* right side */}
      
      <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Profile</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">The information on this page will be used to <span className="italic">match</span> you to potential housing options. This page can also be used as a <span className="italic">template</span> for your outreach to properties.</p>
      </div>

      {/* top border */}
      <div className="mt-6 border-t border-gray-100">

      {/* horizontal dividers between child elements along the y-axis */}
        <dl className="divide-y divide-gray-100"> 

      {/* name */}
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user ? user.name : ""}</dd>
          </div>

        {/* about */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            {/* definition lists: dt = definition term; dd = definition */}
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

              {/* about textarea: copied in */}
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                </label>
                <p className="text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                        defaultValue={''}
                  />
                </div>
                
              </div>

            </dd>
          </div>
          
          {/* boroughPreference */}
            {/* <Checkbox index={0} /> */}
            <Checkbox section={`borough`}/>
            
          
           {/* program */}
           {/* <Checkbox index={1} /> */}
           <Checkbox section={`program`}/>

          {/* householdSize */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              # People
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Dropdown section={'householdSize'} />
            </dd>
          </div>

          {/* programAmt */}
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Program amount</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$$</dd>
          </div> */}

          {/* maxPrice */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Max rent price
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <FreeInput section={'maxPrice'} />
            </dd>
          </div>

           {/* beds */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              # Bedrooms
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Dropdown section={'beds'} />
            </dd>
          </div>

          {/* baths */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              # Baths
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Dropdown section={'baths'} />
            </dd>
          </div>

          {/* pets */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Pet policy
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Dropdown section={'pets'} />
            </dd>
          </div>

          {/* creditScore */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Credit score</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <FreeInput section={'creditScore'} />
            </dd>
          </div>

          {/* annualIncome */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Annual income</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <FreeInput section={'annualIncome'} />
            </dd>
          </div>
          
          {/* employmentStatus */}
          {/* <Checkbox index={2} /> */}
          <Checkbox section={`employmentStatus`}/>

          {/* moveInDate */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Earliest move-in</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Calendar />
            </dd>
          </div>

          {/* viewingAvailability */}
          {/* <Checkbox index={3} /> */}
          <Checkbox section={`viewingAvailability`}/>



          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>


      </div>
      
    </div>
  )
}

export default TenantPreferences

{/* <div className="sm:col-span-3">
              <label htmlFor="boroughPreference" className="block text-sm font-medium leading-6 text-gray-900">
                Borough
              </label>
              <div className="mt-2">
                <select
                  id="boroughPreference"
                  name="boroughPreference"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Staten Island</option>
                  <option>Manhattan</option>
                  <option>Bronx</option>
                  <option>Queens</option>
                  <option>Brooklyn</option>
                  <option>Any borough</option>
                </select>
              </div> 
            </div> */}
