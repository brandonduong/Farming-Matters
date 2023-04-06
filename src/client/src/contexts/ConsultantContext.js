import { createContext, useContext, useState } from "react";

export const ConsultantContext = createContext();

export const ConsultantProvider = ({ children }) => {
    const [accessToConsultant, setAccessToConsultant] = useState(false);
    const [consultantStatement, setConsultantStatement] = useState('');
    const [autoPrompt, setAutoPrompt] = useState(true);
    const [isConsultantPrompt, setIsConsultantPrompt] = useState(true);
    const [otherAvatarStatements, setOtherAvatarStatements] = useState([]);
    const [isEventHappening, setIsEventHappening] = useState(false);
    const [typeOfCatastrophicEvent, setTypeOfCatastrophicEvent] = useState('');
    const [displayTransition, setDisplayTransition] = useState(false);

    return (
    <ConsultantContext.Provider
        value={{
            accessToConsultant,
            setAccessToConsultant,
            consultantStatement,
            setConsultantStatement,
            autoPrompt,
            setAutoPrompt,
            isConsultantPrompt,
            setIsConsultantPrompt,
            otherAvatarStatements,
            setOtherAvatarStatements,
            isEventHappening,
            setIsEventHappening,
            typeOfCatastrophicEvent,
            setTypeOfCatastrophicEvent,
            displayTransition,
            setDisplayTransition,
        }}
    > 
        {children} 
    </ ConsultantContext.Provider> 
  );
}