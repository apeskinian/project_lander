import { createContext, useContext, useState } from "react";

const POIContext = createContext();

export function POIProvider({ children }) {
    const [ showFullPOIS, setShowFullPOIS ] = useState(true);
    const [ resetTimestamp, setResetTimestamp ] = useState(Date.now());

    const triggerReset = () => setResetTimestamp(Date.now());
    
    return (
        <POIContext.Provider value={{ showFullPOIS, setShowFullPOIS, resetTimestamp, triggerReset }}>
            {children}
        </POIContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export function usePOI() {
    return useContext(POIContext);
}