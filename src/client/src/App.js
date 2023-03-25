import "./css/App.css";
import "./css/Avatar.css";
import "./css/Inventory.css";
import "./css/Shop.css";
import "./css/SeasonTransition.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/settings.css";
import "./css/slider.css";
import "./css/FarmTile.css";
import "./css/EndGame.css";
import "./css/StartGame.css";
import React, { useEffect, useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { Game } from "./Game";
import { AuthProvider } from "./utils/auth/AuthContext";
import { DeniedPage } from "./components/common/DeniedPage";

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  // This useEffect hook performs all operations needed on page load
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="denied" element={<DeniedPage />} />
          <Route
            path="play"
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
