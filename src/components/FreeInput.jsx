

const FreeInput = ({section}) => {
  return (
    <div>
    <p className="text-sm leading-6 text-gray-600">Enter a number.</p>
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {section !== "creditScore" ? <span className="text-gray-500 sm:text-sm">$</span> : null
        }
      </div>
      <input
        type="number"
        name={section}
        id={section}
        className="block w-72 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
        placeholder="0.00"
      />
      
    </div>
  </div>
  )
}

export default FreeInput
