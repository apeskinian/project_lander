import { createContext, useContext, useState } from "react";

const POIContext = createContext();

export function POIProvider({ children }) {
    const [ useFullPOIS, setUseFullPOIS ] = useState(true);
    const [ resetTimestamp, setResetTimestamp ] = useState(Date.now());

    const triggerReset = () => setResetTimestamp(Date.now());
    
    return (
        <POIContext.Provider value={{ useFullPOIS, setUseFullPOIS, resetTimestamp, triggerReset }}>
            {children}
        </POIContext.Provider>
    );
}
export function usePOI() {
    return useContext(POIContext);
}