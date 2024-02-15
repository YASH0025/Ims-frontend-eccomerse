/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import the Link component from Next.js
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState("");

  const router = useRouter();

  const toggleShow = () => setShow(!show);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Invoke the search query handler on every key press
  };

  // const handleSearch = () => {
  //   router.replace(`/?name=${encodeURIComponent(searchQuery)}`);
  // };

  useEffect(() => {
    const isLoggedInFromDatabase = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedInFromDatabase === "true");
  }, []);

  useEffect(() => {
    const profile = localStorage.getItem("profilePic");
    setIsEditing(profile as any);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedInFromLocalStorage = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(isLoggedInFromLocalStorage === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log(isEditing, "ywie");

  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-6 shadow-md lg:flex-wrap lg:justify-start lg:py-2 animate-navbar overflow-true">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
          type="button"
          onClick={toggleShow}
        >
          <span className="w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div
          className={`${
            show ? "block" : "hidden"
          } flex-grow basis-[100%] items-center lg:!flex lg:basis-auto`}
        >
          <div className="mb-4 ml-2 mr-5 mt-3 flex items-center text-gray-900 hover:text-blue-600 focus:text-blue-600 lg:mb-0 lg:mt-0 cursor-pointer font-medium">
            <img
              src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
              style={{ height: "15px" }}
              alt="TE Logo"
              loading="lazy"
            />
          </div>
          <ul className="list-none mr-auto flex flex-col px-auto lg:flex-row">
            <li className="mb-8 lg:mb-0 lg:pr-2 cursor-pointer px-4 font-medium">
              <Link href="/">
                <p className="hover:text-blue-500">Home</p>
              </Link>
            </li>
            <li className="mb-8 lg:mb-0 lg:pr-2 cursor-pointer px-4 font-medium">
              <Link href="/users/category">
                <p className="hover:text-blue-500">Category</p>
              </Link>
            </li>
            <li className="mb-8 lg:mb-0 lg:pr-2 cursor-pointer px-4 font-medium">
              <Link href="/about">
                <p className="hover:text-blue-500">About Us</p>
              </Link>
            </li>
            <li className="mb-8 lg:mb-0 lg:pr-2 cursor-pointer px-4 font-medium">
              <Link href="/contact">
                <p className="hover:text-blue-500">Contact Us</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative flex items-center ">
          <div className="relative flex items-center mx-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)} // Invoke handleSearch on input change
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-3"
                onClick={() => {
                  // handleSearch();
                }}
              >
                <FaSearch className="text-gray-400" />
              </button>
            </div>
          </div>
          <a
            href="/users/cart"
            className="mr-6 text-gray-600 hover:text-gray-700"
          >
            <span className="w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </span>
          </a>
          <div className="relative flex items-center mx-5">
            <div className="relative group">
              <img
                src={
                  isEditing
                    ? isEditing ||
                      "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    : "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                }
                className="rounded-full h-8 w-8 cursor-pointer ring-4 ring-gradient object-cover"
                alt=""
                loading="lazy"
                onClick={() => {
                  // Toggle dropdown visibility
                  const dropdown = document.getElementById("profile-dropdown");
                  if (dropdown) {
                    dropdown.classList.toggle("hidden");
                  }
                }}
              />
              <div
                id="profile-dropdown"
                className="dropdown-content absolute hidden bg-white rounded-lg shadow-lg mt-2 mr-3 w-48 z-10"
              >
                <a
                  href="/users/update-profile"
                  className="block px-4 py-2 text-black transition-colors duration-300 ease-in-out font-bold text-lg hover:text-blue-400"
                  style={{ textShadow: "0 0 10px rgba(0,0,0,0.2)" }}
                >
                  Profile
                </a>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {!isLoggedIn ? (
              <>
                <button
                  className="group flex items-center justify-start w-9 h-9 bg-blue-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 button-container"
                  onClick={() => router.push("/auth/login")}
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <FaSignInAlt className="text-white w-5 h-5" />
                  </div>
                  <div className="absolute right-3 transform translate-x-full opacity-0 text-white font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 button-text text-base">
                    Log In
                  </div>
                </button>

                <button
                  className="group flex items-center justify-start w-9 h-9 bg-green-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 button-container"
                  onClick={() => router.push("/auth/signup")}
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <FaUserPlus className="text-white w-5 h-5" />
                  </div>
                  <div className="absolute right-3 transform translate-x-full opacity-0 text-white font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 button-text text-base">
                    Signup
                  </div>
                </button>
              </>
            ) : (
              <button
                className="group flex items-center justify-start w-8 h-8 bg-gray-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 button-container"
                onClick={() => {
                  localStorage.setItem("isLoggedIn", "false");
                  setIsLoggedIn(false);
                  router.push("/");
                }}
              >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <FaSignOutAlt className="text-white w-6 h-6" />
                </div>
                <div className="absolute right-3 transform translate-x-full opacity-0 text-white font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 button-text text-base">
                  Logout
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
