import axios from "axios";

const baseURL = "http://localhost:5000";

const userActivityService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  try {
    const response = await userActivityService.get("/user/allProducts");
    console.log(" daya ", response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};

export const getCategorys = async () => {
  try {
    const response = await userActivityService.get("/user/allCategory");
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};
export const getAllProducts = async () => {
  try {
    const response = await userActivityService.get("/user/allProducts");
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};

export const getFilterProducts = async (categoryId: string) => {
  try {
    const response = await userActivityService.get("/admin/filtered", {
      params: { categoryId },
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

export const getOrders = async () => {
  try {
    const response = await userActivityService.get("/user/getOrders");

    if (response.status >= 200 && response.status < 300) {
      console.log(response.data, "testing");

      return response.data;
    } else {
      throw new Error(
        `Failed to fetch products: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to fetch orders";
      throw new Error(errorMessage);
    } else {
      throw new Error("Failed to fetch orders: Network Error");
    }
  }
};

export const setOrder = async (
  productId: string,
  quantity: number,
  token: string
) => {
  console.log(token, "yeju");

  try {
    const response = await axios.post(
      "http://localhost:5000/user/order-product",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data); // Log the response from the API
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error placing order:", error); // Log any errors that occur
    throw new Error("Failed to place order"); // Throw an error indicating failure
  }
};

export const setDecreseQuantity = async (
  productId: string,
  quantity: number,
  token: string
) => {
  console.log(token, "yeju");

  try {
    const response = await axios.post(
      "http://localhost:5000/user/order-productz",
      { productId, quantity },
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

export const deleteProductById = async (
  orderId: string,
  productId: string,
  token: string
) => {
  try {
    console.log("orderID", orderId);

    const response = await userActivityService.post(
      "/user/remove-order",
      { orderId, productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      } // Wrap productId in an object
    );

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

export const getUserByToken = async (token: string) => {
  try {
    const response = await userActivityService.get(
      "/user/singles",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      } // Wrap productId in an object
    );

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
