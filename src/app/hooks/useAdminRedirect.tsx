"use client";
import { useEffect, useState } from "react";
import { isAdmin } from "../services/admin-activity.service";
import CustomAlert from "../{componets}/isAdmin-alert";
import { useRouter } from "next/navigation";

const useAdminRedirect = () => {
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const userTokenString = localStorage.getItem("userToken");
      const token = JSON.parse(userTokenString as any);

      if (token) {
        try {
          const isAdminResponse = await isAdmin(token);
          console.log("isAdminResponse", isAdminResponse);

          setIsAdminUser(isAdminResponse.isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      } else {
        setIsAdminUser(false); // If no token, assume not an admin
      }
    };

    checkAdminStatus();
  }, []);
  console.log("isAdminUser", isAdminUser);

  useEffect(() => {
    if (isAdminUser === false) {
      setShowAlert(true);
    }
  }, [isAdminUser]);

  useEffect(() => {
    if (isAdminUser === false) {
      alert("You are not authorized to visit this page!");
      router.push("/");
    }
  }, [isAdminUser, router]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <CustomAlert
          message="You are not authorized to visit this page!"
          isOpen={showAlert}
          onClose={handleCloseAlert}
        />
      )}
      {isAdminUser}
    </>
  );
};

export default useAdminRedirect;
