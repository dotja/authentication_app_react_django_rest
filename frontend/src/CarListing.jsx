import React, { useEffect, useRef, useState } from "react";
import { client } from "./Url";

const CarListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    model_year: "",
    daily_rate: "",
    transmission: "",
    image_file: "",
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_file" && files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value === "" || value === null) {
         alert("Upload an image");
      }else{
        formDataToSend.append(key, value);
      }
    });
    try {

      const csrfToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrftoken="))
          .split("=")[1];

      const response = client.post("/carlisting", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
      });
      alert("Listing added successfully");
      setFormData({
        make: "",
        model: "",
        model_year: "",
        daily_rate: "",
        transmission: "",
        image_file: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("submitted");
  };
  function openModal() {
    setIsOpen(true);
  }

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
          <div ref={ref} className="bg-black rounded-md p-6 relative">
            <div className="text-white">Create a Listing</div>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-6 flex flex-row justify-center gap-x-8"
            >
              <label
                htmlFor="image_file"
                className="bg-slate-100 h-[230px] w-[180px] 2xl:w-[200px] rounded-sm"
              >
                <input
                  id="image_file"
                  type="file"
                  name="image_file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <div className="flex flex-col gap-y-6">
                <div className="gap-2 flex items-center justify-between items">
                  <label htmlFor="make" className="text-white text-sm">
                    Make
                  </label>
                  <input
                    id="make"
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
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
                    value={formData.model}
                    onChange={handleChange}
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
                    name="model_year"
                    value={formData.model_year}
                    onChange={handleChange}
                    placeholder=""
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500"
                  />
                </div>
                <div className="gap-2 flex items-center justify-between">
                  <label htmlFor="daily_rate" className="text-white text-sm">
                    Daily Rate
                  </label>
                  <input
                    id="daily_rate"
                    type="number"
                    name="daily_rate"
                    value={formData.daily_rate}
                    onChange={handleChange}
                    placeholder=""
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="gap-2 flex items-center justify-evenly">
                  <label htmlFor="transmission" className="text-white text-sm">
                    Automatic
                  </label>
                  <input
                    id="automatic"
                    type="radio"
                    name="transmission"
                    value="automatic"
                    onChange={handleChange}
                    className=""
                  />
                  <label htmlFor="transmission" className="text-white text-sm">
                    Manual
                  </label>
                  <input
                    id="manual"
                    type="radio"
                    name="transmission"
                    value="manual"
                    onChange={handleChange}
                    className=""
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="text-yellow py-1 px-3 border border-yellow rounded-sm text-sm hover:bg-yellow hover:text-white"
                  >
                    Add Listing
                  </button>
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
