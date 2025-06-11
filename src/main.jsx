// Import StrictMode from React to highlight potential problems in your app during development
import { StrictMode } from 'react'
// Import createRoot from react-dom/client to render your React app
import { createRoot } from 'react-dom/client'
// Import the main stylesheet for the application
import './index.css'
// Import the root App component
import App from './App.jsx'
// Import Provider from react-redux to connect your Redux store to the React app
import { Provider } from 'react-redux'
// Import the Redux store from your store file
import { store } from './redux/store'

// Get the root DOM element and render your React app inside it
createRoot(document.getElementById('root')).render(
  // Use StrictMode to catch common mistakes and deprecated features
  <StrictMode>
    {/* Wrap the App with Provider to make the Redux store available to all components */}
    <Provider store={store}>
      {/* The main App component */}
      <App/>
    </Provider>
  </StrictMode>,
)
