import './css/App.css';
import './css/Avatar.css';
import './css/Inventory.css';
import './css/Shop.css';
import './css/SeasonTransition.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/settings.css';
import './css/slider.css';
import './css/FarmTile.css';
import './css/EndGame.css';
import './css/StartGame.css';
import React from 'react';
import { LoginPage } from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Game } from './Game';
import { AuthProvider } from './utils/auth/AuthContext';
import { DeniedPage } from './components/common/DeniedPage';
import { GameInfoProvider } from './contexts/GameInfoContext';
import { ConsultantProvider } from './contexts/ConsultantContext';
import { ItemsProvider } from './contexts/ItemContext';

const App = () =>
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
                <GameInfoProvider>
                  <ConsultantProvider>
                    <ItemsProvider>
                      <Game />
                    </ItemsProvider>
                  </ConsultantProvider>
                </GameInfoProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>


export default App;
