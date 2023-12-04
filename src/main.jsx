import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ListingProviderWrapper } from "./context/listing.context.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <ListingProviderWrapper>
          <App />
        </ListingProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
