import { Bell, User } from "lucide-react";
import React from "react";

const Nav = () => {
  return (
    <div className="w-full fixed top-0 left-0 border-b border-b-gray-100 bg-white shadow-xs">
      <div className="w-full flex items-center justify-between max-w-6xl mx-auto p-4">
        <div className="">
          <h1 className="text-2xl">Payzento</h1>
        </div>
        <div className="flex items-center gap-4">
          <Bell />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Nav;
