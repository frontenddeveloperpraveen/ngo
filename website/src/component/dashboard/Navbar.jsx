import { UserButton, UserProfile, useUser } from "@clerk/clerk-react";
import { HamIcon, MenuIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const Navbar = ({ openBurger }) => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return;
  }
  return (
    <nav className="flex justify-between  items-center px-5 navbar">
      <div className="flex gap-5 justify-center items-center">
        <div
          className="block lg:hidden"
          id="ham-burger-icon"
          onClick={() => {
            return openBurger(true);
          }}
        >
          <MenuIcon />
        </div>
        <img
          src="https://th.bing.com/th/id/OIP.NlP6LS6u360mxhdr1fzYwQHaHa?rs=1&pid=ImgDetMain"
          alt=""
          width={75}
        />
      </div>

      <div className="flex justify-center items-center gap-3">
        <div className="rounded-full overflow-auto user-btn">
          <UserButton />
        </div>
        <div>
          <h1 className="px-1 font-semibold">{user.fullName}</h1>
          <select
            name=""
            id=""
            className="border-none outline-none text-gray-500 text-sm "
          >
            <option value="">Fundraiser</option>
            <option value="" disabled>
              Donator
            </option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
