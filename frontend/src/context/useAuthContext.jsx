import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

// Custom hook that provides easy access to the current context value.
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// Used to wrap parts of the component tree that need access to the context value.
export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authUser")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};