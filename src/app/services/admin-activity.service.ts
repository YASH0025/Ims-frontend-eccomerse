import axios from "axios";

const baseURL = "http://localhost:5000";

const userActivityService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addCategory = async (name: string, token: any) => {
  try {
    console.log(name, "test");

    const response = await userActivityService.post(
      "/admin/category",
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Failed to place order");
  }
};

export const addProduct = async (ProdctData: any, token: any) => {
  try {
    console.log(ProdctData, "test", token, " wa");

    const response = await userActivityService.post(
      "/admin/product/create",

      ProdctData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Failed to place order");
  }
};

export const getUsers = async () => {
  try {
    const response = await userActivityService.get("/user/allUsers");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};

export const setUserRole = async (userId: string, roleName: number) => {
  try {
    console.log(" 222", userId, roleName);

    const response = await userActivityService.put(
      "/admin/assign-role",
      { userId, roleName }
      // Wrap productId in an object
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing Role:", error); // Log any errors that occur
    throw new Error("Failed to place order"); // Throw an error indicating failure
  }
};

export const deleteUser = async (userId: string) => {
  try {
    console.log(" 222", userId);

    const response = await userActivityService.post(
      "/user/deleteUser",
      { userId }
      // Wrap productId in an object
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing Role:", error); // Log any errors that occur
    throw new Error("Failed to place order"); // Throw an error indicating failure
  }
};

export const isAdmin = async (token: any) => {
  try {
    // console.log(ProdctData, "test", token, " wa");

    const response = await userActivityService.get(
      "/admin/isadmin",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Failed to place order");
  }
};
export const getFilterProduct = async (name: string | null = null) => {
  try {
    const response = await userActivityService.get("/admin/filters", {
      params: { name },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch products: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to fetch products";
      throw new Error(errorMessage);
    } else {
      throw new Error("Failed to fetch products: Network Error");
    }
  }
};
