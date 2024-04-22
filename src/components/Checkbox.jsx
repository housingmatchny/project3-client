import React from 'react'

//object of objects with arrays
const data = {
  borough:{
    title:'Borough',
    options:[
    "Staten Island", 
    "Manhattan", 
    "Bronx", 
    "Brooklyn", 
    "Queens", 
    "Any borough"
    ]},
  program: {
    title: "Program",
    options:[
    "CityFHEPS", 
    "FHEPS", 
    "EHV", 
    "Section 8", 
    "Rapid Re-housing",
    "Not listed here"
    ]},
  employmentStatus: {
    title:"Employment",
    options: [
    "Working full-time",
    "Working part-time",
    "Enrolled in a job training program",
    "Waiting for work authorization",
    "Looking for work",
    "None of the above",
    "Prefer not to say"
    ]},
  viewingAvailability: {
    title: "Viewing availability",
    options: [
    "Anytime",
    "Weekend mornings",
    "Weekend afternoons",
    "Weekend evenings",
    "Weekday mornings",
    "Weekday afternoons",
    "Weekday evenings"
    ]}
}

const Checkbox = ({section}) => {
    
      // //list of all the keys in an array; e.g., ['borough','program']
      // let keys = Object.keys(data)

      // console.log(section, typeof section)

      // // Handle borough selection
      // const handleBoroughPrefs = (borough) => {
      //   // Check if the borough is already selected
      //   if (boroughPrefs.includes(borough)) {
      //     // If selected, remove it from the list
      //     setBoroughPrefs(boroughPrefs.filter((checked) => checked !== borough));
      //   } else {
      //     // If not selected, add it to the list
      //     setBoroughPrefs([...boroughPrefs, borough]);
      //   }
      // };
    // console.log(data[section])
      return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {data[section] && data[section]?.title}
            {/* {keys.map(key => data[key].title)} */}
            {/* {data[keys[index].title]} */}
          </dt>

          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <p className="text-sm leading-6 text-gray-600">Select all that apply.</p>
            {data[section] && data[section]?.options.map((el) => (
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  {/* value below is submitted to server with checkbox name */}
                  <input
                    id={el}
                    value={el}
                    name={data[section].title}
                    // name={data[keys[index]].title}
                    //e.g., name="borough"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-800"
                  />
                </div>
                <div className="text-sm leading-6">
                  {/* e.g., label="borough" */}
                  <label
                    htmlFor={data[section].title}
                      // {data[keys[index]].title}
                    className="font-medium text-gray-900"
                  >
                    {el}
                  </label>
                </div>
              </div>
            ))}
          </dd>
        </div>
      );
    };
   

export default Checkbox