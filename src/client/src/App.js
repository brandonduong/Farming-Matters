import "./css/App.css";
import "./css/Inventory.css";
import { LoginPage } from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { Game } from "./Game";
import { AuthProvider } from './utils/auth/AuthContext';
import { DeniedPage } from "./components/common/DeniedPage";

const App = () => {

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} /> 
          <Route path="denied" element={<DeniedPage />} />
          <Route path="play" element={
            <PrivateRoute >
              <Game />
            </PrivateRoute>
          } 
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
