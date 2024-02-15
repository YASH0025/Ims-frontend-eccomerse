/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { addProduct } from "@/app/services/admin-activity.service";
import { getCategorys } from "@/app/services/user-activity.service";

const AddProductsPage = () => {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setProductName] = useState("");
  const [price, setPrice] = useState<any>();
  const [quantity, setQuantity] = useState<any>();
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategorys();
        if (Array.isArray(res.categories)) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userTokenString = localStorage.getItem("userToken");
    const userToken = JSON.parse(userTokenString as any);

    const filteredCategories = categories.filter(
      (category: { name: string }) => category.name === selectedCategory
    );
    const categoryId = filteredCategories[0]._id;
    const formData = {
      name,
      price,
      categoryId,
      quantity,
      description,
    };

    // Create FormData object to append files
    const formDataWithFiles = new FormData();
    for (const file of Array.from(selectedFiles || [])) {
      formDataWithFiles.append("files", file);
    }

    for (const key in formData) {
      formDataWithFiles.append(key, formData[key as keyof typeof formData]);
    }

    console.log(formDataWithFiles);

    const result = await addProduct(formDataWithFiles, userToken);
    alert(`${result.name} with ID ${result._id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  return (
    <>
      <div className="flex justify-center items-center  prevent-scrollbar">
        <div className="bg-gray-200 shadow-xl rounded-lg p-6 w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <input
              className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              type="text"
              placeholder="Product Name"
              onChange={(e) => setProductName(e.target.value)}
              id="productName"
              name="productName"
            />
            <input
              className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              name="price"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black"
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              type="number"
              placeholder="Quantity"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              name="quantity"
            />

            <textarea
              className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
            />
            <div>
              <input
                type="file"
                multiple // Allow multiple files
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                accept=".jpg,.jpeg,.png"
              />
              <label
                htmlFor="fileInput"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              >
                Upload Image
              </label>
            </div>
            <button
              className="p-3 shadow-md rounded-md w-full bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductsPage;
