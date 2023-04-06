import { useContext } from "react";
import { ConsultantContext } from "./ConsultantContext";
import { GameInfoContext } from "./GameInfoContext";
import { InventoryContext } from "./InventoryContext";
import { ItemsContext } from "./ItemContext";

export const useConsultant = () => useContext(ConsultantContext)

export const useGameInfo = () => useContext(GameInfoContext)

export const useInventory = () => useContext(InventoryContext)

export const useItems = () => useContext(ItemsContext)


