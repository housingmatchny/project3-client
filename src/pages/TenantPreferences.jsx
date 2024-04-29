import { useParams } from "react-router-dom";
import { get, put, axiosDelete } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { useState, useContext } from "react";
import UserCard from "../components/UserCard";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import FreeInput from "../components/FreeInput";
import Calendar from 'react-calendar'
import axios from "axios";


//follow TenantPersonal page as a guide
//set up form to submit

const TenantPreferences = ({checked}) => {
  const{user, setUser} = useContext(AuthContext)
  const [prefs, setPrefs] = useState("")
  
  const { tenantId } = useParams();

  //shows and saves new input
  const handlePrefs = () => {

  }

  //posts to API endpoint
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newPrefs = {
      checked
    };
    //send newPrefs to the API endpoint; if successful, the .then block will execute
    put(`/profile/preferences/${tenantId}`, newPrefs)
      .then((response) => {
        console.log("Updated Prefs ===>", response.data);
        setPrefs("");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  


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
      <div className="mt-6 border-t border-gray-100" />

      {/* questions section. all under dl tag for formatting. "divide" gives horizontal dividers between the child elements along the y-axis */}
      <form onSubmit={handleFormSubmit}>
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
                <p className="text-sm leading-6 text-gray-600">Write a few sentences about yourself to introduce yourself to landlords, brokers, and property managers.</p>
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
          
          <button
            type="submit"
            className="focus:outline-none tracking-tight text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover"
            >
            Update profile
          </button>
        </dl>
      </form>


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
