
import React, { useContext, useEffect, useState } from "react";
import { client } from "./Url";
import { UserContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ManageProfile = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [userProfile, setUserProfile] = useState("");
    // Declares the path of the avatar placeholder
    const profilePlaceholder = "/images/profile_placeholder.jpg";
    
    const baseUrl = "http://localhost:8000";
  
    //The profile placeholder is displayed if the user did not upload a profile
    const imagePath = userProfile ? userProfile : profilePlaceholder;
  
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      contact: "",
      user_profile: "",
    });
   
  
    useEffect(() => {
  
      if (currentUser) {
        fetchUserData();
      } 
    }, [currentUser]);
  
    const fetchUserData = async () => {
      try {
        const response = await client.get("/user");
        const userData = response.data;
  
        setUserProfile(userData.user_profile);
  
        setFormData({
          username: userData.username,
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          password: userData.password,
          contact: userData.contact,
        });
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      if (name === "user_profile" && files) {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
      } else {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
  
      //Conditionally append the formData if the value is null or not
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" || value !== null) {
          formDataToSend.append(key, value);
        }
      });
  
      try {
        //gets the token from the browser
        
        const csrfToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrftoken="))
          .split("=")[1];
  
        console.log("Token:", csrfToken);
        const response = await client.put("/user/profile", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        });
  
        window.location.reload(); //reloads the page after update
      } catch (error) {
        console.error("Error updating the profile: ", error);
      }
    };
  return (
    <>
      <div className="flex justify-center h-screen pt-20 mx-auto text-white md:w-10/12">
      
        <div className="md:mx-10 w-[700px] mt-20 2xl:mt-28 2xl:text-lg 2xl:w-[800px]">
          <div className="text-lg 2xl:text-xl">Profile Settings</div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center gap-8 mt-10"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="relative flex flex-row items-start gap-4">
                <input
                  type="text"
                  name="username"
                  defaultValue={formData.username}
                  onChange={handleChange}
                  className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow"
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    defaultValue={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                  >
                    Email
                  </label>
                </div>
              </div>
              <div className="relative flex flex-row items-start gap-4">
                <input
                  type="text"
                  name="firstname"
                  defaultValue={formData.firstname}
                  onChange={handleChange}
                  className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow"
                />
                <label
                  htmlFor="firstname"
                  className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                >
                  Firstname
                </label>
                <div className="relative ">
                  <input
                    type="text"
                    name="lastname"
                    defaultValue={formData.lastname}
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow"
                  />
                  <label
                    htmlFor="lastname"
                    className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                  >
                    Lastname
                  </label>
                </div>
              </div>
              <div className="relative flex flex-row items-start gap-4">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    defaultValue={formData.password}
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="contact"
                    defaultValue={formData.contact}
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <label
                    htmlFor="contact"
                    className="absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow"
                  >
                    Contact No.
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-sm border-none rounded outline-none text-yellow ring-1 ring-yellow hover:bg-yellow hover:text-white "
              >
                Confirm Changes
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <label htmlFor="user_profile">Change Profile</label>
              <label
                htmlFor="user_profile"
                className="flex flex-col items-center justify-center gap-8 cursor-pointer"
              >
                <img
                  src={baseUrl + imagePath}
                  alt="profile picture"
                  className="rounded-full object-cover cursor-pointer w-[150px] h-[150px] border-2 p-1 border-yellow hover:border-white"
                />
                <span className="pb-1 duration-75 hover:border-b-2 hover:text-yellow hover:border-b-yellow">
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Upload Profile
                </span>
                <input
                  id="user_profile"
                  type="file"
                  name="user_profile"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ManageProfile