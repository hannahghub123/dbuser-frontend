import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/AxiosInstance";

const Home = () => {
  const navigate = useNavigate();

  const logoutHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("logout/");

      console.log(response.data);
      if (response.data.message === "User loggedOut successfully") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userDetails");
        navigate("../");
      }
    } catch (error) {
      console.error("failed:", error.response.data);
    }
  };

  const documentsHandle=()=>{
    navigate('../mydocuments')
  }

  return (
    <div>
      <h1>Home page Log in Successful</h1>
      <button onClick={logoutHandle}>Logout</button>
      <button onClick={documentsHandle}>MyDocuments</button>
    </div>
  );
};

export default Home;
