import { createContext, useState,useContext } from "react";
const authContext = createContext();


export function AuthProvider({ children }) {
    const [user,setUser] = useState(null);

    function login(userData) {
        console.log("in login",userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }
    function logout() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>

    );
}
export function useAuth() {
  return useContext(authContext);
}