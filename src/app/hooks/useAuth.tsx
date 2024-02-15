// utils/protectAdminRoute.js
// utils/protectAdminRoute.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "../services/admin-activity.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const protectAdminRoute = (WrappedComponent: any) => {
  const WithAdminCheck = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [isAdminUser, setIsAdminUser] = useState(false); // Default to false
    const router = useRouter();

    useEffect(() => {
      const fetchAdminStatus = async () => {
        try {
          const userTokenString = localStorage.getItem("userToken");
          const token = JSON.parse(userTokenString as any);
          const isAdminResponse = await isAdmin(token);
          console.log("isAdminResponse", isAdminResponse);
          setIsAdminUser(isAdminResponse.isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          router.push("/login");
        } finally {
          setLoading(false); // Set loading to false regardless of success or error
        }
      };

      fetchAdminStatus();

      return () => {};
    }, [router]);

    useEffect(() => {
      console.log("isAdminUser", isAdminUser); // Check the value of isAdminUser
      if (isAdminUser) {
        toast.success("Welcome! You are authorized to view this page.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(
          "Unauthorized Access! You are not authorized to view this page.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    }, [isAdminUser]);

    // Redirect logic after isAdminUser state is properly set
    useEffect(() => {
      if (!loading && !isAdminUser) {
        router.push("/");
      }
    }, [loading, isAdminUser, router]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          <div className="ml-4 text-xl">Verifying authorization...</div>
        </div>
      );
    }

    if (isAdminUser) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div>
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Unauthorized Access!</p>
          <p>You are not authorized to view this page.</p>
        </div>
      </div>
    );
  };

  return WithAdminCheck;
};

export default protectAdminRoute;
