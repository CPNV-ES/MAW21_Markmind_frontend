import React, { createContext, useContext, useState } from 'react';

const ResourceContext = createContext();

export const useResource = () => useContext(ResourceContext);

export const ResourceProvider = ({ children }) => {
    const [resourceId, setResourceId] = useState(null);

    const setResource = (id) => {
        setResourceId(id);
    };

    return (
        <ResourceContext.Provider value={{ resourceId, setResource }}>
            {children}
        </ResourceContext.Provider>
    );
};
