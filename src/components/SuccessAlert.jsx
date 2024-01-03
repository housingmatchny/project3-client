//saved/unsaved modal

const SuccessAlert = () => {

  //if hearticonsolid => first alert
  //if hearticonoutline => second alert

  const [saveModal, setSaveModal] = useState("");

  const handleSaveModal = () => {
    setSaveModal("Saved to your Profile!")
  }
  const handleUnsaveModal = () => {
    setSaveModal("Unsaved from your Profile!")
  }

  return (
    <>
    {saveModal ? 
    (
    <div role="alert" 
        className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="stroke-current shrink-0 h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        <span>{handleSaveModal}</span>
    </div>) : 
    (
    <div role="alert" 
        className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="stroke-current shrink-0 h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        <span>{handleUnsaveModal}</span>
    </div>)
    }
    </>
    
    // <div>
    //   <div
    //     className="bg-red-100 border border-green-600 text-green-700 px-4 py-3 rounded relative"
    //     role="alert"
    //   >
    //     <strong className="font-bold">Saved to your Profile!</strong>
    //     {/* <span className="block sm:inline">
    //       Something seriously bad happened.
    //     </span> */}
    //     <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    //       <svg
    //         className="fill-current h-6 w-6 text-green-700"
    //         role="button"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 20 20"
    //       >
    //         <title>Close</title>
    //         <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
    //       </svg>
    //     </span>
    //   </div>
    // </div>
  );
};

export default SuccessAlert
