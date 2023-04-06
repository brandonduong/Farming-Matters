import { createContext, useState, useContext } from "react";
import { useAuth } from "../utils/auth/hooks";

export const GameInfoContext = createContext();

export const GameInfoProvider = ({ children }) => {
    const { user } = useAuth();
    const userName = user.displayName.substring(0, 10);
    const [grid, setGrid] = useState([]);
    const [money, setMoney] = useState(2500);
    const [turn, setTurn] = useState(1);
    const [decisionType, setDecisionType] = useState(0);
    const [landscape, setLandscape] = useState([]);
    const [farmBuildings, setFarmBuildings] = useState([]);
    const [season, setSeason] = useState('Fall');
    const [backgroundMusicVolume, setBackgroundVolume] = useState(5);
    const [soundEffectsVolume, setSoundEffectsVolume] = useState(5);

    return (
    <GameInfoContext.Provider
        value={{
            userName,
            grid,
            setGrid,
            money,
            setMoney,
            turn,
            setTurn,
            decisionType,
            setDecisionType,
            landscape,
            setLandscape,
            farmBuildings,
            season,
            setSeason,
            backgroundMusicVolume,
            setBackgroundVolume,
            soundEffectsVolume,
            setSoundEffectsVolume,
        }}
    > 
        {children} 
    </ GameInfoContext.Provider> 
  );
}