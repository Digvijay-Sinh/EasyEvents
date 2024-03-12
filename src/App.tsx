import { useNavigate } from "react-router-dom";
import "./App.css";
import { AuthData, useAuth } from "./context/AuthProvider";
import Layout from "./layout/Layout";
import { useEffect } from "react";
import axios, { axiosPrivate } from "./api/axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refreshToken", {
      withCredentials: true,
    });
    if (
      response.status === 403 ||
      response.status === 401 ||
      response.status === 400
    ) {
      navigate("/");
      return null; // Return null or handle the error accordingly
    }
    setAuth((prevAuth: AuthData) => ({
      ...prevAuth!,
      accessToken: response.data.accessToken,
      // Include other properties if needed
    }));
    return response.data.accessToken;
  };
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (auth && "accessToken" in auth) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          // Set the expiration time to 20 seconds from the current time

          // Set the cookie with the specified expiration time

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);
  return (
    <>
      <Toaster
        containerStyle={{
          top: 80,
        }}
      />
      <Layout />
    </>
  );
}

export default App;
