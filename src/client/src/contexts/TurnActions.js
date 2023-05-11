import { createContext, useContext, useState } from 'react';

export const TurnActionsContext = createContext([]);

export const TurnActionsProvider = ({ children }) => {
  const [currentTurnActions, setcurrentTurnActions] = useState([]);

  return (
    <TurnActionsContext.Provider
      value={{
        currentTurnActions,
        setcurrentTurnActions,
      }}
    >
      {children}
    </TurnActionsContext.Provider>
  );
};
