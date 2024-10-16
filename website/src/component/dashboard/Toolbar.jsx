import { SignOutButton } from "@clerk/clerk-react";
import {
  AppWindow,
  HandCoins,
  LayoutDashboard,
  LogOut,
  LogOutIcon,
  Monitor,
} from "lucide-react";
import React from "react";

const Toolbar = ({ Interface, activebtn }) => {
  console.log(activebtn);
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
    <section className="px-6">
      <div className="mt-10">
        {Menu.map((element, index) => (
          <span
            className={`flex gap-3 items-center mb-6 px-2 py-2 rounded-md cursor-pointer
              ${
                activebtn === element.name
                  ? "bg-blue-500 text-black"
                  : "hover:bg-blue-400"
              }`}
            key={index}
            onClick={() => {
              return Interface(`${element.name}`);
            }}
          >
            {element.icon}
            <h1 className="text-lg">{element.name}</h1>
          </span>
        ))}
        <span className="flex gap-3 items-center mb-6 px-2 py-2 rounded-md hover:bg-red-400 cursor-pointer">
          <LogOutIcon /> <SignOutButton />
        </span>
      </div>
    </section>
  );
};

export default Toolbar;
