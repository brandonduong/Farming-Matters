import { createContext } from "react";
import {
    generateNTurnPriceState,
  } from '../components/GameLogic/GameLogic';
import { shopItemsList } from '../components/Shop/constants';
import { itemFluctuation } from "../components/GameLogic/constants";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const marketItems = [];
    for (let i = 1; i < shopItemsList.length; i++) {
        marketItems.push(shopItemsList[i]);
    }

    const allTurnPrices = generateNTurnPriceState(
        10,
        itemFluctuation,
        marketItems,
    );

    return (
    <ItemsContext.Provider
        value={{
            marketItems,
            allTurnPrices,
        }}
    > 
        {children} 
    </ ItemsContext.Provider> 
  );
}