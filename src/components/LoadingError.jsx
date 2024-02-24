//loading error

const LoadingError = () => {
  return (
    <div className="flex flex-col justify-center gap-4 w-52 mt-20">
        <h3 className="text-center text-1xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        Loading...
        <br />
        </h3>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28 mb-4"></div>
        <div className="skeleton h-4 w-full mb-4"></div>
        <div className="skeleton h-4 w-full mb-4"></div>
    </div>
  )
}

export default LoadingError
