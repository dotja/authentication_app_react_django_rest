import React from "react";
import { Link, Outlet } from "react-router-dom";
const ProfileSettings = () => {
  return (
    <>
    {/* Sidebar */}
      <div className="absolute left-4 w-[18%] h-[87%] bottom-0 text-white bg-black flex flex-col p-2 gap-2 rounded-md rounded-l-none text-sm border-l-yellow border-l-2">
        <Link to="/account-settings">
          <div className="px-3 py-2 hover:bg-black-2 hover:text-yellow">
            Manage Profile
          </div>
        </Link>
        <div className="px-3 py-2 hover:bg-black-2 hover:text-yellow">
          Manage Account
        </div>
        <Link to="/account-settings/car-listing">
          <div className="px-3 py-2 hover:bg-black-2 hover:text-yellow">
            Car Listing
          </div>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default ProfileSettings;
