import React, { useState } from "react";
import { setUser } from "../features/playSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Home component: The main landing page for the app
const Home = () => {
  // Local state for the username input field
  const [username, setUserName] = useState("");
  // Redux dispatch and selector hooks for managing global state
  const dispatch = useDispatch();
  // Get the current user's name from the Redux store
  const user = useSelector((state) => state.play.name);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  function handle_submit() {
    // console.log('handle_submit starts, user:', user, 'username:', username) for debugging
    // If there's a new username entered, update Redux state and navigate
    if (username.trim()) {
      localStorage.setItem("username", username);
      dispatch(setUser(username));
      navigate("/play");
    }
    // If the user is already set (from Redux), just navigate to /play
    else if (user) {
      navigate("/play");
    }
  }

  // Main component render
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-200 to-white flex items-center justify-center">
      <div className="max-w-screen-md w-full mx-auto p-4">
        {/* Welcome message section */}
        <div className=" backdrop-blur-sm rounded-xl shadow-lg border border-black w-full max-w-screen-md mx-auto p-4">
          <p className="p-3 mt-2 text-2xl text-black text-center mb-2">
            Hello World!
          </p>
          <p className="p-3 mt-2 text-2xl text-black text-center mb-2">
            This is my first React Project.
          </p>
          <p className="p-3 mt-2 text-2xl text-black text-center mb-2">
            This is a word predictor web app based on Vite.
          </p>
        </div>

        {/* User input and greeting section */}
        <div className="mt-3 backdrop-blur-sm rounded-xl shadow-lg border text-black border-black w-full max-w-screen-md mx-auto p-4">
          {/* Show welcome message if user is already set, otherwise show input */}
          {user ? (
            <div className="flex place-content-center">
              <p className="p-3 rounded-xl mt-2 text-xl">Welcome, {user}</p>
            </div>
          ) : (
            <>
              <div className="flex place-content-center">
                <p className="p-3 text-xl rounded-xl mt-2">
                  Before we start I would like to know your name.
                </p>
              </div>
              <div className="flex flex-row gap-2 place-content-evenly">
                <input
                  className="rounded-2xl pl-2 "
                  type="text"
                  placeholder="What should I call you?"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)} // NOTE: Typo here, should be setUserName
                  onKeyDown={(e) => e.key === "Enter" && handle_submit()}
                />
              </div>
            </>
          )}
          {/* Always show the "Let's Go" button */}
          <div className="flex justify-center mt-4 text-white">
            <button
              onClick={handle_submit}
              disabled={!user && !username.trim()} // Disable if no user and no username
              className="px-4 py-2 bg-green-500 rounded-xl hover:bg-green-600 disabled:opacity-50"
            >
              <span>Let's go </span>
              <i className="fas fa-play"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
