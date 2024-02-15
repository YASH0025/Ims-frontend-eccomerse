/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/app/{componets}/footer";
import Navbar from "@/app/{componets}/navbar";
import useAuth from "@/app/hooks/useAuth";
import {
  getAllProducts,
  getProducts,
  setOrder,
} from "@/app/services/user-activity.service";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { getFilterProduct } from "@/app/services/admin-activity.service";
import { log } from "console";

const Products = ({ params }: any) => {
  const { id } = params;

  // useAuth();
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<{
    productId?: { _id: any; name: string; price: number; images: any[] };
  } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        console.log("sdsgfg", res);

        if (Array.isArray(res as any)) setProducts(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("allproducts", products);

  const handleOrderClick = async () => {
    try {
      const userTokenString = localStorage.getItem("userToken");
      const userToken = JSON.parse(userTokenString as any);

      console.log(userToken, "toekns");

      if (!userToken) {
        console.error("User token not found in local storage");
        return;
      }

      if (!selectedProduct) {
        console.error("No product selected");
        return;
      }

      const orderId = await setOrder(
        selectedProduct.productId?._id,
        1,
        userToken
      );
      alert("orderplaces");
      console.log("Order placed successfully with ID:", orderId);
    } catch (error) {
      console.error("Error handling order:", error);
    }
  };
  useEffect(() => {
    const selected = products.find((product: any) => product._id === id);
    console.log("selecteddf", selected);

    setSelectedProduct(selected as any);
  }, [id, products]);

  console.log(selectedProduct);

  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideInLeftAnimation = useSpring({
    transform: "translateX(0%)",
    from: { transform: "translateX(-100%)" },
  });

  const slideInRightAnimation = useSpring({
    transform: "translateX(0%)",
    from: { transform: "translateX(100%)" },
  });

  const buttonAnimation = useSpring({
    from: { scale: 1 },
    to: { scale: isFullScreen ? 1.1 : 1 },
  });

  const codeFontAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      review: "This camera is amazing! I love the picture quality.",
      stars: 5,
    },
    {
      id: 2,
      user: "Jane Smith",
      review: "I've been using this camera for a month now and it's fantastic.",
      stars: 4,
    },
    {
      id: 3,
      user: "Michael Johnson",
      review: "Great value for the price. Highly recommend it.",
      stars: 5,
    },
  ];

  return (
    <>
      {selectedProduct ? (
        <div className="container mx-auto my-8">
          <animated.div style={fadeInAnimation}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <animated.div style={slideInLeftAnimation}>
                <img
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className={`w-full h-auto mb-4 rounded-lg shadow-lg cursor-pointer ${
                    isFullScreen && "max-h-screen"
                  }`}
                  src={
                    "http://localhost:5000/" +
                      selectedProduct.productId?.images[0] ||
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={selectedProduct.productId?.name || "Product Image"}
                />
              </animated.div>
              <animated.div style={slideInRightAnimation}>
                <h1 className="text-4xl font-semibold mb-4">
                  <animated.span
                    style={{
                      marginRight: "10px",
                      display: "inline-block",
                      ...slideInRightAnimation,
                    }}
                  >
                    {selectedProduct.productId?.name}
                  </animated.span>
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  <animated.span style={codeFontAnimation}>
                    {`
                      Capture life's most memorable moments with our cutting-edge digital camera. 
                      Equipped with state-of-the-art technology, including a high-resolution sensor 
                      and advanced image processing capabilities, this camera delivers stunning clarity 
                      and detail in every shot. Whether you're a professional photographer or a hobbyist, 
                      you'll appreciate its intuitive controls, ergonomic design, and versatile shooting modes. 
                      From breathtaking landscapes to action-packed events, this camera ensures that you never miss a shot. 
                      Plus, its compact and lightweight design makes it easy to carry with you wherever you go. 
                      Elevate your photography game with our premium digital camera and unleash your creativity.
                    `}
                  </animated.span>
                </p>
                <animated.button
                  onClick={handleOrderClick} // Call handleOrderClick when the button is clicked
                  style={{
                    ...buttonAnimation,
                    ...slideInRightAnimation,
                  }}
                  className="px-6 py-3 rounded bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                >
                  {isFullScreen ? "View Full Image" : "Add to Cart"}
                </animated.button>
                {/* Reviews Section */}
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                  {showReviews && (
                    <div>
                      {reviews.map((review) => (
                        <div key={review.id} className="mb-4">
                          <p className="text-lg font-semibold">{review.user}</p>
                          <div className="flex items-center mb-2">
                            {[...Array(review.stars)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 1a.75.75 0 01.65.372l1.903 3.56 4.059.589a.75.75 0 01.416 1.281l-2.93 2.865.69 4.017a.75.75 0 01-1.088.791L10 13.347l-3.617 1.898a.75.75 0 01-1.088-.79l.69-4.017L.966 6.802a.75.75 0 01.416-1.281l4.06-.589L9.35 1.372A.75.75 0 0110 1zm0 2.445L8.568 5.55a.75.75 0 01-.564.41l-3.096.45 2.24 2.187a.75.75 0 01.216.664l-.528 3.071 2.769-1.455a.75.75 0 01.698 0l2.77 1.455-.53-3.071a.75.75 0 01.217-.664l2.24-2.187-3.096-.45a.75.75 0 01-.564-.41L10 3.446v.999z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setShowReviews(!showReviews)}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-300 mb-4"
                  >
                    {showReviews ? "Hide Reviews" : "Show Reviews"}
                  </button>
                </div>
              </animated.div>
            </div>
          </animated.div>
        </div>
      ) : (
        <div className="container mx-auto my-8">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Products;
