// components/UserForm.tsx
"use client";
import { createUser, loginUser } from "@/app/services/userForm.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { isAdmin } from "../services/admin-activity.service";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Import necessary modules

const LoginForm = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmins, setIsAdmin] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await loginUser(values);
      localStorage.setItem("userToken", JSON.stringify(res.token));
      localStorage.setItem("userId", JSON.stringify(res.user._id));
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      alert("User Login successfully!");
      const userTokenString = localStorage.getItem("userToken");
      const adminTokens = JSON.parse(userTokenString as any);
      const isAdminResponse = await isAdmin(adminTokens);
      setIsAdmin(isAdminResponse.isAdmin);
      console.log(isAdmins);

      if (isAdminResponse.isAdmin) {
        router.push("/admin");
        console.log("1", isAdmins);
      } else {
        router.push("/");
        console.log("2", isAdmins);
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <h6> vk18@gmail.com</h6>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 shadow-xl rounded-lg p-6 w-full max-w-md overflow-hidden">
          <h2 className="text-2xl font-bold mb-8">Login Form</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-3 shadow-md my-4 rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-3 shadow-md my-3 rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-3 shadow-md my-4 rounded-md w-full bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className={`btnmy-4 bg-blue-500 text-white hover:bg-blue-600 w-full my-2 py-2 rounded-lg p`}
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
