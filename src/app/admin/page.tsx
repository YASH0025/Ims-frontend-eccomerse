/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategorys, getProducts } from "../services/user-activity.service";
import CategoryChart from "../{componets}/categorygraph";
import PieChart from "../{componets}/piechart";
import LineChart from "../{componets}/linechart";

const AdminHome: React.FC = () => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        if (Array.isArray(res)) {
          setProducts(res as any);
          setFadeIn(true); // Trigger fade-in effect
          setTimeout(() => setLoading(false), 500); // Set loading to false with slight delay for fade-in animation
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategorys();
        setCategoryData(response.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-200">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8  text-blue-400">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center p-5">
          <div className="rounded-lg bg-gray-200 p-5">
            <div className="flex items-center justify-center p-5">
              <div className="rounded-lg bg-gray-200 p-5">
                <div className="flex">
                  <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r bg-blue-400 p-5">
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="pointer-events-none absolute w-5 fill-white transition hover:bg-blue-400"
                    >
                      <path
                        className="transition hover:bg-blue-400"
                        d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"
                      ></path>
                    </svg>
                  </div>

                  <input
                    type="text"
                    className="w-full max-w-[160px] bg-gray-200 pl-2 text-base font-semibold border border-blue-200 outline-0 focus:ring focus:ring-blue-400"
                    placeholder=""
                    id=""
                  />
                  <input
                    type="button"
                    value="Search"
                    className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-300 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-300 w-106 h- animate-pulse rounded-xl p-4 gap-4"
            >
              <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
              <div className="flex flex-col gap-2">
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className={`bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-2xl ${
                fadeIn && "animate-fade-in"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Category Chart
              </h2>
              <CategoryChart
                categoryData={categoryData}
                products={products}
                width="100%"
                height="400px"
              />
            </div>
            <div
              className={`bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-2xl ${
                fadeIn && "animate-fade-in"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Pie Chart
              </h2>
              <PieChart
                categoryData={categoryData}
                products={products}
                width="100%"
                height="400px"
              />
            </div>
            <div
              className={`bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-2xl ${
                fadeIn && "animate-fade-in"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Line Chart
              </h2>
              <LineChart
                categoryData={categoryData}
                products={products}
                width="100%"
                height="400px"
              />
            </div>
          </div>
          <div className="container mx-auto my-12 flex justify-center items-start flex-wrap">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
              Categories
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {categoryData.slice(0, 6).map((category: any, index: any) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 bg-neutral-50 rounded-lg shadow-xl flex flex-col items-center justify-center gap-4 p-4 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200"
                >
                  <img
                    src={
                      category.image ||
                      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="text-center">
                    <div>
                      <h1 className="text-lg font-bold">Name</h1>
                    </div>
                    <h4 className="text-xl font-bold hover:text-blue-500 hover:text-2xl">
                      {category.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/admin/show-categorys">
                <p className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  More Categories
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
