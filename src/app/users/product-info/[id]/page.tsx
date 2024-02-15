/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { getFilterProducts } from "@/app/services/user-activity.service";
import { animated, useSpring } from "react-spring";
import { useRouter } from "next/navigation";

const ProductInfo = ({ params }: any) => {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await getFilterProducts(id);
          console.log(res);

          setProducts(res);
          setShowMessage(res.length === 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleProductClick = (productId: string) => {
    router.push(`/users/product/${productId}`);
  };

  const messageAnimation = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? "translateY(0%)" : "translateY(-100%)",
    from: { opacity: 0, transform: "translateY(-100%)" },
  });

  return (
    <>
      <h1>ProductInfo</h1>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products.map((product: any, index) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
                index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover object-center transition-transform duration-300 transform hover:scale-110"
                  src={
                    "http://localhost:5000/" + product.product.images[0] ||
                    `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
                  }
                  alt={product.product.name}
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-gray-800 font-semibold text-lg mb-2">
                  {product.product.name}
                </h2>
                <p className="text-gray-600">{product.product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-700 font-bold text-xl">
                    ${product.product.price}
                  </span>
                  <button className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <animated.div
          style={messageAnimation}
          className="text-center text-gray-600 font-semibold text-3xl"
        >
          <span
            style={{
              fontSize: "2.5rem",
              animation: "dance 2s infinite",
              display: "inline-block",
            }}
          >
            No products found in this category 🛒
          </span>
          <span style={{ animation: "bounce 2s infinite" }}>🎉</span>
        </animated.div>
      </div>
    </>
  );
};

export default ProductInfo;
