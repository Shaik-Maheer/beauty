import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-pink-700">Welcome to Stylistar</h1>
      <p className="mt-2 text-gray-600">Discover beauty products & save your favourites!</p>
      <button
        onClick={() => navigate("/login")}
        className="mt-6 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Get Started
      </button>
    </div>
  );
};

export default IntroPage;
