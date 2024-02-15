// userService.js
import axios from "axios";

const baseURL = "http://localhost:5000/user";

const userService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (userData: any) => {
  try {
    const response = await userService.post("", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};
export const loginUser = async (loginData: any) => {
  try {
    const response = await userService.post("/login", loginData);
    console.log(response, "yes");

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to login user");
  }
};

export const updateUser = async (formData: any, token: any) => {
  try {
    const response = await userService.patch("/update-profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};

export const updateUsers = async (formData: any, token: any) => {
  try {
    console.log(formData, "formdata");

    const response = await userService.put("/updateprofile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // enctype: "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to update user");
  }
};
