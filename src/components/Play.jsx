import { TrieContext } from "../App";
import { useContext, useState } from "react";
import { addToHistory } from "../features/playSlice";
import { useDispatch, useSelector } from "react-redux";

const Play = () => {
  // Hook to dispatch actions to Redux store
  const dispatch = useDispatch();
  // Access the trie instance from context
  const trie = useContext(TrieContext);
  // Get the username from the Redux store
  const username = useSelector((state) => state.play.name);

  // State to track the current index in the predictions list
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track if the user has answered 'Yes' (true), 'No' (false), or not yet (null)
  const [userAnswer, setUserAnswer] = useState(null);
  // State to track if we've reached the end of the predictions list
  const [endOfList, setEndOfList] = useState(false);
  // State to track the user's input
  const [input, setInput] = useState("");
  // State to control whether to show the predictions list
  const [showList, setShowList] = useState(false);
  // State to store the list of matching words from the trie
  const [predictions, setPredictions] = useState([]);

  // Handler for input field changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  // Handler for the submit button
  const handle_submit = () => {
    if (input.trim()) {
      // Get all words from the trie that match the input prefix
      const newPredictions = trie.get_list_of_matching_words(
        input.toLowerCase()
      );
      setUserAnswer(null);
      setEndOfList(false);
      // If no words match, set endOfList to show the 'Sorry' message
      if (newPredictions.length === 0) setEndOfList(true);
      else {
        // Otherwise, update the predictions list and show it
        setPredictions(newPredictions);
        setShowList(true);
        setCurrentIndex(0);
      }
    }
  };

  // Handler for the 'Yes' button
  const handleYes = () => {
    setUserAnswer(true);
    setInput("");
    setPredictions([]);
    setShowList(false);
    setCurrentIndex(0);
    // Add the current word to the history in Redux
    dispatch(addToHistory(predictions[currentIndex]));
  };

  // Handler for the 'No' button
  const handleNo = () => {
    const nextIndex = currentIndex + 1;
    // If there are more words, move to the next one
    if (nextIndex < predictions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // Otherwise, set endOfList to show the 'Sorry' message
      setEndOfList(true);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Hi, {username}</h2>
      </div>
      {/* Input field for the user to enter a prefix */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 my-4">
        <input
          className="w-full sm:w-64 p-2 rounded-2xl text-gray-700 border-2"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter prefix"
        />
        {/* Submit button, disabled if input is empty */}
        <button
          onClick={handle_submit}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
          disabled={!input.trim()}
        >
          Submit
        </button>
      </div>
      {/* Show the current word and ask for confirmation if there are predictions */}
      {showList && predictions.length > 0 && !endOfList && (
        <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-evenly 
        mt-3 backdrop-blur-sm 
        rounded-xl shadow-lg border border-black max-w-screen-md mx-auto p-4">
          <div className="mt-2 text-black text-center">
            <p>
              Hey, {username}, is this your word?
            </p>
            <p className="text-xl mt-2">
              {predictions[currentIndex]}
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={handleYes}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
              Yes
            </button>
            <button onClick={handleNo} 
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
              No
            </button>
          </div>
        </div>
      )}
      {/* Show a success message if the user answers 'Yes' */}
      {userAnswer === true && (
        <div className="mt-2 p-2 bg-green-600 text-white rounded-xl 
          flex justify-center max-w-screen-md mx-auto">
          <p>Congratulations, {username}! You found your word!</p>
        </div>
      )}
      {/* Show a 'Sorry' message if there are no matching words or the list is exhausted */}
      {endOfList && (
        <div className="mt-2 p-2 bg-red-600 text-white 
          rounded-xl flex justify-center max-w-screen-md mx-auto">
          <p>Sorry, {username}, the word is not in our list.</p>
        </div>
      )}
    </div>
  );
};

export default Play;
