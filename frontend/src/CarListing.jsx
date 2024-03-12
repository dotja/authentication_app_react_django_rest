import React, { useState } from "react";

const CarListing = () => {

    const [isOpen, setIsOpen] = useState(false);

    function openModal(){
       if(isOpen ? setIsOpen(false) : setIsOpen(true)); 
    }

  return (
    <>
      <div className="flex justify-center h-screen pt-20 mx-auto text-white md:w-10/12">
        <div className="md:mx-10 w-[700px] py-6 ">
          <div className="mb-4 text-lg">Car Listing</div>
          <button onClick={openModal} className="px-4 py-2 border rounded-sm border-yellow text-yellow hover:text-white hover:border-white">
            + Add Listing
          </button>
        </div>
      </div>
    </>
  );
};

export default CarListing;
