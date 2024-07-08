import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider.jsx';

const RenderWhenAnonymous = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log("RenderWhenAnonymous ->", isAuthenticated);

    return !isAuthenticated ? children : null;
}

export default RenderWhenAnonymous;
