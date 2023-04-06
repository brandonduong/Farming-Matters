import { createContext, useContext, useState } from "react";

export const InventoryContext = createContext([]);

export const InventoryProvider = ({ children }) => {
    const defaultCropInfo = {
        rice: [],
        carrot: [],
        orange: [],
        lettuce: [],
        tomato: [],
        watermelon: [],
        wheat: [],
        pumpkin: [],
        beet: [],
        berries: [],
        mushroom: [],
        wintermelon: [],
    };
    
    const [inventoryState, setInventoryState] = useState([]);
    const [cropInfo, setCropInfo] = useState(defaultCropInfo);

    return (
    <InventoryContext.Provider
        value={{
            inventoryState,
            setInventoryState,
            cropInfo,
            setCropInfo,
        }}
    > 
        {children} 
    </ InventoryContext.Provider> 
  );
}