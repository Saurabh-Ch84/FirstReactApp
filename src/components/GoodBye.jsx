import React from "react";
import { useSelector } from "react-redux";

const GoodBye = () => {
  const username = useSelector((state) => state.play.name);

  return (
    <div className="text-blackbackdrop-blur-sm  shadow-lg border border-black w-full max-w-screen-md mx-auto p-4 rounded-2xl flex flex-col place-content-center">
      <div className="flex place-content-center">
        <h2 className="text-2xl text-black font-bold mb-4">
          GoodBye, {username}!
        </h2>
      </div>
      <p className="mb-6 text-black text-xl flex place-content-center">
        Thank you for using my app. Come back any time!
      </p>
    </div>
  );
};

export default GoodBye;
