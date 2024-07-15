import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider.jsx';

const RenderWhenAuthenticated = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log("RenderWhenAuthenticated ->", isAuthenticated);

    return isAuthenticated ? children : null;
}

export default RenderWhenAuthenticated;
