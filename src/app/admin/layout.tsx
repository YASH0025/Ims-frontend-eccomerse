/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  MdCategory,
  MdStore,
  MdPeople,
  MdMenu,
  MdArrowDropDown,
  MdArrowDropUp,
  MdExpandLess,
  MdExpandMore,
  MdHome,
} from "react-icons/md";
import "tailwindcss/tailwind.css";
import useAdminRedirect from "../hooks/useAdminRedirect";
import useAuth from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // useAdminRedirect();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    toast.success("Welcome, Admin!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []); // Empty dependency array ensures this runs only once, on initial render

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAccordion = (name: string) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastContainer />

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white ${
          isSidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        } transform md:translate-x-0 transition-all duration-300 fixed top-0 left-0 bottom-0 z-50 md:relative`}
      >
        <div className="p-6 text-2xl font-semibold">Sidebar</div>

        <ul className="p-2">
          <li className="relative">
            <span className="block py-5 px-4 text-bold flex items-center text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
              <Link href="/admin">
                <div className="flex items-center">
                  <MdHome className="mr-2" />
                  <span className="block py-2 px-4 text-gray-300 hover:text-white">
                    Home Page
                  </span>
                </div>
              </Link>
            </span>
          </li>
          {/* Category Accordion */}
          <li className="relative">
            <span
              className="block py-5 px-4 flex items-center text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => toggleAccordion("category")}
            >
              <MdCategory className="mr-2" />
              Categories{" "}
              {activeAccordion === "category" ? (
                <MdExpandLess className="ml-auto" />
              ) : (
                <MdExpandMore className="ml-auto" />
              )}
            </span>
            {activeAccordion === "category" && (
              <ul className="bg-gray-700 p-2">
                <li>
                  <Link href="/admin/add-category/show-category">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdCategory className="mr-2" />
                      View All Categories
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/add-category/create-categorys">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdCategory className="mr-2" />
                      Create Category
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Product Accordion */}
          <li className="relative mt-4">
            <span
              className="block py-5 px-4 flex items-center text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => toggleAccordion("product")}
            >
              <MdStore className="mr-2" />
              Products{" "}
              {activeAccordion === "product" ? (
                <MdExpandLess className="ml-auto" />
              ) : (
                <MdExpandMore className="ml-auto" />
              )}
            </span>
            {activeAccordion === "product" && (
              <ul className="bg-gray-700 p-2">
                <li>
                  <Link href="/admin/add-product/create-products">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdStore className="mr-2" />
                      Create Product
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/add-product/show-products">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdStore className="mr-2" />
                      View Products
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* User Accordion */}
          <li className="relative mt-4">
            <span
              className="block py-5 px-4 flex items-center text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => toggleAccordion("user")}
            >
              <MdPeople className="mr-2" />
              Users{" "}
              {activeAccordion === "user" ? (
                <MdExpandLess className="ml-auto" />
              ) : (
                <MdExpandMore className="ml-auto" />
              )}
            </span>
            {activeAccordion === "user" && (
              <ul className="bg-gray-700 p-2">
                <li>
                  <Link href="/admin/add-users/show-user">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdPeople className="mr-2" />
                      View Users
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/add-users/create-user">
                    <span className="flex items-center py-2 px-4 text-gray-300 hover:text-white">
                      <MdPeople className="mr-2" />
                      Add User
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow relative z-0">
        {/* Navbar */}
        <div className="bg-gray-900 text-white p-4 z-10 relative shadow-md">
          <div className="flex justify-between items-center">
            {/* Mobile Sidebar Toggle Button */}
            <div className="block md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleSidebar}
              >
                <MdMenu size={24} />
              </button>
            </div>
            <div className="text-lg font-semibold">Admin Panel</div>
            <div className="flex items-center">
              <div className="mr-4">Welcome, Admin!</div>
              {/* Add logout button or user avatar here */}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-grow p-8 overflow-y-auto relative z-0 m-8 bg-gray-200 shadow-xl rounded-xl">
          {/* Show sidebar only on larger screens */}
          {children}
        </div>
      </div>
      {/* Sidebar Overlay (for Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 cursor-pointer md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default useAuth(AdminLayout);
