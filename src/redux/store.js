// Import the configureStore function from Redux Toolkit.
// This is used to create the Redux store with less boilerplate.
import { configureStore } from '@reduxjs/toolkit';

// Import the play reducer (slice) from your features directory.
// The reducer manages the state and actions related to your "play" feature.
import playReducer from '../features/playSlice';

// Create and export the Redux store.
export const store = configureStore({
  // Define the root reducer as an object.
  // Here, you assign the playReducer to the 'play' key.
  // This means your Redux state will have a 'play' property managed by playReducer.
  reducer: {
    play: playReducer
  },
});
