import { SignOutButton } from "@clerk/clerk-react";
import { HandCoins, LayoutDashboard, LogOutIcon, X } from "lucide-react";
import React from "react";

const Hamburger = ({ Interface, openBurger }) => {
  const Menu = [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard",
    },
    {
      icon: <HandCoins />,
      name: "Transaction",
    },
  ];
  return (
    <div
      className="h-[99vh] overflow-hidden top-0 absolute w-screen bg-white z-10"
      id="hamburger-view-window"
      style={{ display: "none" }}
    >
      <nav className="flex justify-end mr-5 mt-5">
        <span
          id="close-mob-view"
          onClick={() => {
            return openBurger(false);
          }}
        >
          <X />
        </span>
      </nav>
      <div className="mt-10 flex justify-start items-center flex-col">
        <div className="flex justify-center items-center">
          <img
            src="https://th.bing.com/th/id/OIP.NlP6LS6u360mxhdr1fzYwQHaHa?rs=1&pid=ImgDetMain"
            alt=""
            width={100}
          />
        </div>
        {Menu.map((element, index) => (
          <span
            className={`flex gap-3 items-center mb-6 px-2 py-2 rounded-md cursor-pointer`}
            key={index}
            onClick={() => {
              return Interface(`${element.name}`, "mob");
            }}
          >
            {element.icon}
            <h1 className="text-lg">{element.name}</h1>
          </span>
        ))}
        <span className="flex gap-3 items-center mb-6 px-2 py-2 rounded-md hover:bg-red-400 cursor-pointer justify-center ">
          <LogOutIcon /> <SignOutButton />
        </span>
      </div>
    </div>
  );
};

export default Hamburger;
