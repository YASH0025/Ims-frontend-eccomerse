/* eslint-disable @next/next/no-img-element */
"use client";
import {
  deleteProductById,
  getOrders,
  getProducts,
  setDecreseQuantity,
  setOrder,
} from "@/app/services/user-activity.service";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

const Cart = () => {
  const [orders, setOrders] = useState<any>([]);
  const [userId, setUserId] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);
  const flipAnimation = useSpring({
    transform: isHovered ? "rotateY(0deg)" : "rotateY(-180deg)",
  });

  const checkoutAnimation = useSpring({
    opacity: isHovered ? 0 : 1,
    width: isHovered ? "70%" : "0%",
    height: isHovered ? "70%" : "0%",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await getOrders();
        if (Array.isArray(ordersResponse)) {
          setOrders(ordersResponse as any);
        } else {
          console.log("error at getting the order");
        }

        const userToken = localStorage.getItem("userId");
        const userId = JSON.parse(userToken as any);

        if (userId) setUserId(userId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPrice = orders
    .filter((order: { userId: any }) => order.userId === userId)
    .reduce((acc: number, order: any) => {
      if (order.productId && order.productId.price) {
        return acc + order.productId.price * order.quantity;
      } else {
        return acc;
      }
    }, 0);

  const decreese = async (id: any) => {
    const updatedOrders = orders.map((order: any) => {
      if (order.productId?._id === id) {
        return { ...order, quantity: order.quantity - 1 };
      }
      return order;
    });
    setOrders(updatedOrders);

    const userTokenString = localStorage.getItem("userToken");
    const userToken = JSON.parse(userTokenString as any);
    if (!userToken) {
      console.error("User token not found in local storage");
      return;
    }

    const orderId = await setDecreseQuantity(id, 1, userToken);
    console.log("Order placed successfully with ID:", orderId);
  };

  const increase = async (id: any) => {
    const updatedOrders = orders.map((order: any) => {
      if (order.productId?._id === id) {
        return { ...order, quantity: order.quantity + 1 };
      }
      return order;
    });
    setOrders(updatedOrders);

    const userTokenString = localStorage.getItem("userToken");
    const userToken = JSON.parse(userTokenString as any);
    if (!userToken) {
      console.error("User token not found in local storage");
      return;
    }

    const orderId = await setOrder(id, 1, userToken);
    console.log("Order placed successfully with ID:", orderId);
  };

  const handleRemoveProduct = async (productId: any) => {
    try {
      const userTokenString = localStorage.getItem("userToken");
      const userToken = JSON.parse(userTokenString as any);

      const orderToRemove = orders.find(
        (order: any) => order.productId?._id === productId
      );

      if (!orderToRemove) {
        console.error("Order not found");
        return;
      }

      const deletedOrders = await deleteProductById(
        orderToRemove._id,
        productId,
        userToken
      );

      const updatedOrders = orders.filter(
        (order: any) => order._id !== orderToRemove._id
      );
      setOrders(updatedOrders);

      console.log("Product removed successfully with ID:", deletedOrders);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex justify-between">
        <div className="w-3/4">
          {orders
            .filter((order: { userId: any }) => order.userId === userId)
            .map((order: any, index: any) => (
              <div key={index} className="flex mb-4 relative">
                <div className="bg-white p-6 rounded-lg shadow-2xl flex items-center w-full transition-transform duration-300 transform hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Product"
                    className="w-40 h-40 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold">
                        <div> Name:</div>
                        <div>{order.productId?.name}</div>
                      </h3>
                      <div>
                        <p className="text-gray-600 font-bold">
                          <div>Price:</div>
                          <div> ${order.productId?.price}</div>
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center">
                      <button
                        className="flex justify-center items-center gap-2 w-20 h-10 cursor-pointer rounded-md shadow-md text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-sm hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                        onClick={() => handleRemoveProduct(order.productId._id)}
                      >
                        <svg viewBox="0 0 15 15" className="w-4 fill-white">
                          <svg
                            className="w-5 h-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                          Button
                        </svg>
                      </button>

                      <div className="text-gray-600 font-bold mb-2">
                        Quantity
                      </div>
                      <div className="flex items-center">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
                          onClick={() => increase(order.productId._id)}
                        >
                          +
                        </button>
                        <p className="text-center font-bold">
                          {order.quantity}
                        </p>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2"
                          onClick={() => decreese(order.productId._id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="w-1/3">
          <div
            className="book relative w-96 h-96 bg-grey-200 rounded-lg shadow-2xl mx-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <animated.div
              className="back absolute inset-0 flex items-center justify-center p-6 perspective-3xl"
              style={checkoutAnimation}
            ></animated.div>
            <animated.div
              className="front absolute inset-0 flex items-center justify-center p-6 perspective-3xl"
              style={flipAnimation}
            >
              <div className="cover absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-200 rounded-lg cursor-pointer">
                {!isHovered && (
                  <p
                    className="text-lg font-bold text-gray-700"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <h2>Total Price: ${totalPrice}</h2>
                    Hover me to checkout
                  </p>
                )}
                {isHovered && (
                  <>
                    <p className="text-xl font-bold">Order Checkout</p>
                    <p className="text-gray-700 font-bold">
                      Total Price: ${totalPrice}
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </animated.div>
          </div>
          {!isHovered && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Hover here to view checkout details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
