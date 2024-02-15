/* eslint-disable @next/next/no-img-element */
"use client";
import { getUserByToken } from "@/app/services/user-activity.service";
import { updateUser, updateUsers } from "@/app/services/userForm.service";
import React, { useEffect, useState } from "react";
import "./updateinfo.css"; // Import CSS file for styling

const UpdateProfile = () => {
  const [formDatas, setFormData] = useState({
    name: "",
    number: "",
    city: "",
    state: "",
    profilePic: "", // Initialize profilePic state
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTokenString = localStorage.getItem("userToken");
        const userToken = JSON.parse(userTokenString as any);

        const userResponseArray = await getUserByToken(userToken);
        console.log("User data:", userResponseArray);

        const userResponse = userResponseArray[0];

        setFormData({
          name: userResponse.name,
          number: userResponse.number,
          city: userResponse.address.city,
          state: userResponse.address.state,
          profilePic: localStorage.getItem("profilePic") || "", // Load profilePic from localStorage
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file as any);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePic: fileUrl,
      }));
      localStorage.setItem("profilePic", fileUrl); // Save profilePic to localStorage
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formDatas,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userTokenString = localStorage.getItem("userToken");
      const userToken = JSON.parse(userTokenString as any);

      const formData = new FormData();
      formData.append("name", formDatas.name);
      formData.append("number", formDatas.number);
      formData.append("city", formDatas.city);
      formData.append("state", formDatas.state);
      formData.append("profilePic", formDatas.profilePic);

      if (selectedFile) {
        formData.append("file", selectedFile, selectedFile.name);
      }

      console.log(formData.getAll("file"), "mew");

      const updateData = await updateUsers(formData, userToken);
      console.log("Updated form data:", updateData);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden mt-8">
        <div className="px-8 py-6">
          <div className="font-bold text-2xl mb-4 text-center">
            Update Profile
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="form-animate">
              <div className="flex items-center justify-center mb-1">
                <div className="relative group cursor-pointer">
                  {/* Glowing Gradient Border */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 blur opacity-10 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                  <div className="p-3 relative md:w-48 md:h-48 h-32 w-32 rounded-full overflow-hidden">
                    {/* Profile Picture */}
                    <div className="rounded-full h-full w-full bg-gray-100 dark:bg-gray-800">
                      {formDatas.profilePic && formDatas.profilePic ? (
                        <img
                          src={formDatas.profilePic}
                          alt="Profile"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          fill="currentColor"
                          className="bi bi-person-fill text-white dark:text-indigo-300"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                        </svg>
                      )}
                    </div>
                    {/* Glowing Border */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 ring-4 ring-gradient animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <label
                  htmlFor="profile-image-upload"
                  className="block text-gray-700 text-2xl font-bold mb-2 cursor-pointer"
                >
                  📤
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="profile-image-upload"
                />
              </div>

              <div className="mb-6 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="items-center bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-700  outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded px-4 py-1 shadow-md focus:shadow-lg focus:shadow-indigo-500 "
                  autoComplete="off"
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  value={formDatas.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-6 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Number
                </label>
                <input
                  className="items-center bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-700  outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded px-4 py-1 shadow-md focus:shadow-lg focus:shadow-indigo-500 "
                  autoComplete="off"
                  id="number"
                  type="text"
                  placeholder="Number"
                  name="number"
                  value={formDatas.number}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  City
                </label>
                <input
                  className="items-center bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-700  outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded px-4 py-1 shadow-md focus:shadow-lg focus:shadow-indigo-500 "
                  autoComplete="off"
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formDatas.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-6 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  State
                </label>
                <input
                  className="items-center bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-700  outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded px-4 py-1 shadow-md focus:shadow-lg focus:shadow-indigo-500 "
                  autoComplete="off"
                  id="state"
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formDatas.state}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-center">
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="flex items-center justify-center mb-6">
                <div className="w-64 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
                  {/* Profile display section */}
                  <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="bi bi-person-fill text-white dark:text-indigo-300"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    </svg>
                    <figcaption className="sr-only">
                      {formDatas.name}, User
                    </figcaption>
                  </figure>
                  <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {formDatas.name}
                  </h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {formDatas.number}
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {formDatas.city}, {formDatas.state}
                  </p>
                  {/* Edit button */}
                  <button
                    onClick={handleEditClick}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
