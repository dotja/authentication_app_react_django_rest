import React, { useEffect, useRef, useState } from "react";
import { client } from "./Url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const CarListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
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
      if (value !== "") {
        formDataToSend.append(key, value);
      }
    });
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        .split("=")[1];

      const response = client
        .post("/carlisting", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          handleToast("Successfully added");
          setIsError(false)
          setFormData({
            make: "",
            model: "",
            model_year: "",
            daily_rate: "",
            transmission: "",
            image_file: "",
          });
        })
        .catch((error) => {
          handleToast("Please upload an image");
          setIsError(true);
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }
  function handleToast(toast) {
    setToast(toast);
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
        <div className="absolute top-0 z-20 flex items-center justify-center w-screen h-screen bg-opacity-25 bg-slate-600">
          <div ref={ref} className="relative p-6 bg-black rounded-md">
            <div className="text-white text-lg mb-4">Create a Listing</div>
            <div
              className={`text-center text-sm py-1 rounded-sm ${
                isError
                  ? "text-red-500 border border-red-500"
                  : "text-green-500 border border-green-500"
              } ${toast ? "" : "hidden"}`}
            >
              {toast}
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center mt-8 mb-6 gap-x-8"
            >
              <label
                htmlFor="image_file"
                className="flex items-center justify-center bg-black-2 h-[280px] w-[200px] 2xl:w-[200px] rounded-md text-yellow font-thin"
              >
                {formData.image_file ? (
                  <img
                    src={URL.createObjectURL(formData.image_file)}
                    className="object-cover h-[280px] w-[200px] 2xl:w-[230px] rounded-md hover:object-contain"
                  />
                ) : (
                  <div className="text-sm flex flex-col items-center justify-center gap-y-2">
                    <span>
                      <FontAwesomeIcon icon={faUpload} size="xl" />
                    </span>
                    <p>Upload image</p>
                  </div>
                )}
                <input
                  id="image_file"
                  type="file"
                  name="image_file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between gap-2 items">
                  <label htmlFor="make" className="text-sm text-white">
                    Make
                  </label>
                  <input
                    id="make"
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Toyota, Ford, Chevrolet"
                    className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm required:border-red-700"    
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="model" className="text-sm text-white">
                    Model
                  </label>
                  <input
                    id="model"
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder=""
                    className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="model_year" className="text-sm text-white">
                    Model Year
                  </label>
                  <input
                    id="model_year"
                    type="text"
                    name="model_year"
                    value={formData.model_year}
                    onChange={handleChange}
                    required
                    placeholder=""
                    className="px-2 py-1 text-sm text-white placeholder-gray-500 border-none bg-black-2 focus:outline-none placeholder:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="daily_rate" className="text-sm text-white">
                    Daily Rate
                  </label>
                  <input
                    id="daily_rate"
                    type="number"
                    name="daily_rate"
                    value={formData.daily_rate}
                    onChange={handleChange}
                    placeholder=""
                    required
                    className="text-sm border-none bg-black-2 focus:outline-none text-white px-2 py-1 placeholder:text-sm placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex items-center gap-2 justify-evenly">
                  <label htmlFor="transmission" className="text-sm text-white">
                    Automatic
                  </label>
                  <input
                    id="automatic"
                    type="radio"
                    name="transmission"
                    value="automatic"
                    onChange={handleChange}
                  />
                  <label htmlFor="transmission" className="text-sm text-white">
                    Manual
                  </label>
                  <input
                    id="manual"
                    type="radio"
                    name="transmission"
                    value="manual"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm border rounded-sm text-yellow border-yellow hover:bg-yellow hover:text-white"
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
