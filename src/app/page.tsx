/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import { getProducts } from "./services/user-activity.service";
import Navbar from "./{componets}/navbar";
import Footer from "./{componets}/footer";
import { useRouter } from "next/navigation";
// import useAuth from "./hooks/useAuth";

interface Product {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    // other properties
  };
  __v: number;
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [img, setImg] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        console.log("Fetched products:", res);
        if (Array.isArray(res)) {
          const filteredProducts = res.filter(
            (product) => product.productId !== null
          );

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      products.length > 0 &&
      products[0].productId &&
      products[0].productId.images.length > 0
    ) {
      setImg(products[0].productId.images[0]);
    }
  }, [products]);

  console.log(img);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.productId &&
        product.productId.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            (searchQuery ? filteredProducts : products).map(
              (product, index) => (
                <div
                  key={product._id}
                  className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-48 object-cover object-center transition-transform duration-300 transform hover:scale-110"
                      src={
                        product.productId
                          ? "http://localhost:5000/" +
                            product.productId.images[0]
                          : "https://via.placeholder.com/300"
                      }
                      alt={product.productId ? img : "Unknown"}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-gray-800 font-semibold text-lg mb-2">
                      {product.productId ? product.productId.name : "Unknown"}
                    </h2>
                    <p className="text-gray-600">
                      {product.productId
                        ? product.productId.description
                        : "Description not available"}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-700 font-bold">
                        $
                        {product.productId
                          ? product.productId.price
                          : "Price not available"}
                      </span>
                      <button className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
