import React, { useState } from "react";

import { Menu } from "lucide-react";
import logo from "../assets/logo.png";
import mic from "../assets/microphone.png";
import { Search } from "lucide-react";
import live from "../assets/live.png";
import { Bell } from "lucide-react";
import { ArrowLeft } from "lucide-react";

import { User } from "lucide-react";
function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <header className="flex items-center justify-between pt-2 mb-6 mx-4 gap-5">
      {/*logo + hamburger menu */}
      <div
        className={`sm:gap-5 md:gap-8 flex-shrink-0 items-center ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <button className="flex items-center justify-center  h-auto hover:bg-gray-200 p-2 hover:rounded-full">
          <Menu className="w-auto h-auto" />
        </button>
        <a href="/" className="flex items-center ">
          <img src={logo} alt="logo" className="w-[100px] h-[75px]" />
        </a>
      </div>

      {/* search bar and mic */}
      <form
        className={`  flex-grow sm:gap-3  md:gap-5 items-center justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {/* back button */}
        <button
          onClick={() => setShowFullWidthSearch(false)}
          className={`hover:bg-gray-200 p-2 hover:rounded-full mr-3 ${
            showFullWidthSearch ? "flex" : "hidden"
          }`}
        >
          <ArrowLeft />
        </button>

        {/* search */}
        <div className="flex   flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="pl-3 rounded-l-full border border-gray-200 shadow-inner shadow-slate-100 py-1 px-4 w-full focus:border-green-600 outline-none"
          />
          <button className="flex items-center justify-center py-2 px-4 rounded-r-full border-r border-t border-b border-gray-200 bg-gray-100 hover:bg-gray-300">
            <Search />
          </button>
        </div>

        {/* mic */}
        <div className="flex items-center justify-center py-4 px-4 rounded-full border  border-gray-200 bg-gray-100 hover:bg-gray-300 h-auto w-auto cursor-pointer ml-3">
          <button type="button">
            <img src={mic} alt="mic" className="h-[20px] w-[20px]" />
          </button>
        </div>
      </form>

      {/* live + bell + channel logo */}
      <div
        className={` gap-6  justify-center items-center flex-shrink-0 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        {/* search only for small screens */}
        <button
          className="md:hidden flex items-center justify-center py-4 px-4 rounded-full border  border-gray-200 bg-gray-100 hover:bg-gray-300 h-auto w-auto"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </button>
        {/* mic only for small screens */}
        <div className="md:hidden flex items-center justify-center py-4 px-4 rounded-full border  border-gray-200 bg-gray-100 hover:bg-gray-300 h-auto w-auto cursor-pointer">
          <button type="button">
            <img src={mic} alt="mic" className="h-[20px] w-[20px]" />
          </button>
        </div>

        {/* live */}

        <button className="hover:bg-gray-200 p-2 hover:rounded-full">
          <img src={live} alt="go live" className="h-7 w-7" />
        </button>

        {/* bell */}

        <button className="hover:bg-gray-200 p-2 hover:rounded-full">
          <Bell className="h-7 w-7" />
        </button>
        {/* channel logo */}
        <button className="hover:bg-gray-200 p-2 hover:rounded-full">
          <User className="h-[30px] w-[30px]" />
        </button>
      </div>
    </header>
  );
}

export default PageHeader;
//border-4 border-red-700
//border-4 border-blue-700
