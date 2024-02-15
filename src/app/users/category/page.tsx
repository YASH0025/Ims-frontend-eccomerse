/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/app/{componets}/footer";
import Navbar from "@/app/{componets}/navbar";
import { getCategorys } from "@/app/services/user-activity.service";
import Link from "next/link";
import React, { useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = React.useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategorys();
        console.log("res", res);
        if (Array.isArray(res.categories)) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("categories44:", categories);

  return (
    <>
      <div className="max-w-screen-md mx-auto px-4">
        <h1 className="text-2xl font-bold mt-8 mb-4 text-center">Categories</h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category: any, index: number) => (
            <li
              key={category._id}
              className="border border-gray-200 p-4 rounded-md text-center hover:shadow-md transition duration-300 transform hover:-translate-y-1"
            >
              <img
                src={
                  category.image ||
                  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={category.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 transform hover:rotate-3 hover:scale-105 transition duration-300"
              />
              <Link
                href={`product-info/${category._id}`}
                className="text-xl text-black font-bold hover:text-sky-500 hover:font-bold hover:text-2xl hover:transition duration-300"
              >
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
