// Import necessary functions and components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Trie from "./utils/Trie";
import wordList from "./constants/wordList";
import { createContext, useEffect, useRef } from "react";
import Home from "./components/Home";
import Play from "./components/Play";
import ViewPlay from "./components/ViewPlay";
import Exit from "./components/Exit";
import Navbar from "./components/Navbar";
import GoodBye from "./components/GoodBye";
import { useDispatch } from "react-redux";
import { setUser } from "./features/playSlice";

// Create a React context to share the trie instance across components
export const TrieContext = createContext(null);

// Define the application routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Root route
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/play", // Play route
    element: (
      <div className="app-root">
        <Navbar />
        <div className="main-content">
          <Play />
        </div>
      </div>
    ),
  },
  {
    path: "/viewPlay", // ViewPlay route
    element: (
      <div className="app-root">
        <Navbar />
        <div className="main-content">
          <ViewPlay />
        </div>
      </div>
    ),
  },
  {
    path: "/exit", // Exit route
    element: (
      <div>
        <Exit />
      </div>
    ),
  },
  {
    path: "/goodbye", // Exit route
    element: (
      <div>
        <GoodBye />
      </div>
    ),
  },
  {
    path: "*", // Catch-all route for 404 errors
    element: 
    <div>
      <Home/>
      </div>,
  },
]);

function App() {
  // Create a ref to store the trie instance so it persists across re-renders
  const trieRef = useRef(new Trie());
  const dispatch=useDispatch()

  useEffect(()=>{
    const storedUsername=localStorage.getItem('username')
    if(storedUsername)
      dispatch(setUser(storedUsername))
  },[dispatch])

  // Insert initial words into the trie when the component mounts
  useEffect(() => {
    // Insert words into the trie only once after mount
    wordList.forEach((word) => trieRef.current.insert(word));
    // You can also insert from a list or API here if needed
  }, []); // Empty dependency array means this runs only once

  
  return (
    <div>
      {/* Provide the trie instance to all components via context */}
      <TrieContext.Provider value={trieRef.current}>
        {/* Set up the router to handle all routes */}
        <RouterProvider router={router} />
      </TrieContext.Provider>
    </div>
  );
}

export default App;
