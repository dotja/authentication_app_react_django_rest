import React, { useEffect, useRef, useState } from "react";

const CarListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="flex justify-center h-screen pt-20 mx-auto text-white md:w-10/12">
        <div className="md:mx-10 w-[700px] mt-20 2xl:w-[800px] 2xl:mt-28 2xl:text-lg">
          <div className="mb-4 text-lg 2xl:text-xl">Car Listing</div>
          <button
            onClick={openModal}
            className="px-4 py-2 border rounded-sm border-yellow text-yellow hover:text-white hover:border-white"
          >
            + Add Listing
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute flex items-center justify-center z-20 h-screen w-screen bg-slate-600 bg-opacity-25 top-0">
          <div
            ref={ref}
            className="bg-black rounded-md p-6 relative"
          >
            <div className="text-white">Create a Listing</div>
            <form
              onSubmit={handleSubmit}
              className="my-8 flex flex-row justify-center gap-x-8"
            >
              <div className="bg-slate-100 h-[230px] w-[180px] 2xl:w-[200px] rounded-sm"></div>
              <div className="flex flex-col gap-y-6">
                <div className="gap-2 flex items-center justify-between items">
                  <label htmlFor="make" className="text-white text-sm">
                    Make
                  </label>
                  <input
                    id="make"
                    type="text"
                    name="make"
                    placeholder="e.g., Toyota, Ford, Chevrolet"
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500"
                  />
                </div>
                <div className="gap-2 flex items-center justify-between">
                  <label htmlFor="model" className="text-white text-sm">
                    Model
                  </label>
                  <input
                    id="model"
                    type="text"
                    name="model"
                    placeholder=""
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500"
                  />
                </div>
                <div className="gap-2 flex items-center justify-between">
                  <label htmlFor="model_year" className="text-white text-sm">
                    Model Year
                  </label>
                  <input
                    id="model_year"
                    type="text"
                    name="model"
                    placeholder=""
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500"
                  />
                </div>
                <div className="gap-2 flex items-center justify-between">
                  <label htmlFor="rate" className="text-white text-sm">
                    Daily Rate
                  </label>
                  <input
                    id="rate"
                    type="number"
                    name="rate"
                    placeholder=""
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="gap-2 flex items-center justify-evenly">
                  <label htmlFor="transmission" className="text-white text-sm">
                    Automatic
                  </label>
                  <input
                    id="transmission"
                    type="radio"
                    name="transmission"
                    className=""
                  />
                  <label htmlFor="transmission" className="text-white text-sm">
                    Manual
                  </label>
                  <input
                    id="transmission"
                    type="radio"
                    name="transmission"
                    className=""
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CarListing;
