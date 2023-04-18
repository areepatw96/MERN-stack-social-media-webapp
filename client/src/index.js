import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // Import the persist store and the persist reducer
import storage from "redux-persist/lib/storage"; 
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 }; // Create the persist config 
const persistedReducer = persistReducer(persistConfig, authReducer); // Create the persisted reducer
const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => // Add the middleware to the store 
    getDefaultMiddleware({ 
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore the actions that are not serializable 
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root")); // Create the root element 
root.render( // Render the app component 
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);