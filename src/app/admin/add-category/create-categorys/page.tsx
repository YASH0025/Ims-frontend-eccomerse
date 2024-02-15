"use client";
import { addCategory } from "@/app/services/admin-activity.service";
import React, { useState } from "react";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState(""); // Initialize categoryName with an empty string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userTokenString = localStorage.getItem("userToken");
    const userToken = JSON.parse(userTokenString as any);
    try {
      if (!categoryName) {
        throw new Error("Category name cannot be empty");
      }

      const res = await addCategory(categoryName, userToken);
      alert("Category added successfully!");
      console.log(res, "responsedata");
      // Reset the input field after successful submission
      setCategoryName("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 my-12 prevent-scrollbar">
      <div className="bg-gray-200 shadow-xl rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
            type="text"
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            id="categoryName"
            name="categoryName"
          />

          {/* File Upload Field */}

          {/* Dropdown Menu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="mt-1 p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black"
              id="category"
              name="category"
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="relative item ">
            <input
              type="file"
              className="hidden items-center"
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
  );
};

export default AddCategoryPage;
