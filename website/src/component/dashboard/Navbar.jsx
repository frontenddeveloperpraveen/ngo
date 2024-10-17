import { UserButton, UserProfile, useUser } from "@clerk/clerk-react";
import { HamIcon, MenuIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./../../style.css";

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
          src="https://freepadsforindia.org/wp-content/uploads/2021/12/Naye-Pankh-1.jpg"
          alt=""
          width={75}
          class="w-20 h-auto filter invert"
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
