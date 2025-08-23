import { createContext, useContext, useState } from "react";

const POIContext = createContext();

export function POIProvider({ children }) {
    const [ useFullPOIS, setUseFullPOIS ] = useState(true);
    
    return (
        <POIContext.Provider value={{ useFullPOIS, setUseFullPOIS }}>
            {children}
        </POIContext.Provider>
    );
}

export function usePOI() {
    return useContext(POIContext);
}