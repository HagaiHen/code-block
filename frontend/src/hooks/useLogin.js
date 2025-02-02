import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/useAuthContext";


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  // Function to handle user login
  const login = async (username, password) => {

    const isValid = handleInputErrors({ username, password });
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json(); // Parse JSON response from the server
      if (data.error) {
        throw new Error(data.error);
      }

      // Store authentication data in local storage
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      console.log("Error in login", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("please fill all fields");
    return false;
  }
  return true;
}