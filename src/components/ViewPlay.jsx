import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromHistory, clearHistory } from "../features/playSlice";
import { useNavigate } from "react-router-dom";

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${getOrdinal(day)} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

const ViewPlay = () => {
  const history = useSelector((state) => state.play.history);
  const username = useSelector((state) => state.play.name);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHistory = history.filter((entry) =>
    entry.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dispatch = useDispatch();
  const handleBack = () => {
    navigate("/play");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black mb-4">Play History for {username}</h2>
      {history.length > 0 && (
        <button
          onClick={() => dispatch(clearHistory())}
          className="mb-4 p-2 bg-red-600 text-white rounded"
        >
          <i className="fas fa-eraser"></i>
          <span className="visually-hidden">Clear History</span>
        </button>
      )}
      <button
        onClick={handleBack}
        className="ml-2 px-4 py-2 bg-blue-500 text-white
            rounded hover:bg-blue-600"
      >
        <i className="fas fa-chevron-left"></i>
        <span className="visually-hidden">Back</span>
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search your history..."
        className="p-2 mb-4 w-full border rounded text-gray-600"
      />
      {filteredHistory.length === 0 ? (
        <p className="text-gray-700">
          {history.length === 0
            ? "No words found in your history yet."
            : "No matching words found."}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredHistory.map((entry, index) => (
            <li
              key={index}
              className="p-3 bg-gray-300 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{entry.word}</span>
                <span className="block text-sm text-gray-600">
                  {formatDate(entry.timestamp)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    dispatch(
                      removeFromHistory(
                        history.findIndex(
                          (e) =>
                            e.word === entry.word &&
                            e.timestamp === entry.timestamp
                        )
                      )
                    )
                  }
                  className="p-1 bg-red-500 text-white rounded text-sm"
                  aria-label="Delete"
                >
                  <i className="fas fa-trash-alt"></i>
                  <span className="visually-hidden">Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewPlay;
