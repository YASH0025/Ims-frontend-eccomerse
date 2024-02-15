"use client";
import { createUser } from "@/app/services/userForm.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";

const AddUserPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    number: Yup.string().required("Number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await createUser(values);
      alert("User created successfully!");
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-200 shadow-xl rounded-lg p-6 w-full max-w-md overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            number: "",
            city: "",
            state: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="grid gap-6">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
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
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />

              <Field
                type="text"
                name="number"
                placeholder="Number"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500"
              />

              <Field
                type="text"
                name="city"
                placeholder="City"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500"
              />

              <Field
                type="text"
                name="state"
                placeholder="State"
                className="p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#035ec5] hover:bg-[#ffffff42]"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500"
              />

              <Field
                as="select"
                name="role"
                className="mt-1 p-3 shadow-md rounded-md w-full outline-none focus:border-solid border-[#035ec5] placeholder-black"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                className="p-3 shadow-md rounded-md w-full bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserPage;
