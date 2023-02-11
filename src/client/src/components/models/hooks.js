import React from "react";
import { ModelContext } from "./ModelContext"

export const useModels = () => {
    const context = React.useContext(ModelContext)
    if (context === undefined) {
      throw new Error('useModels must be used within a ModelProvider')
    }

    return context
  }