import {createContext, useContext, useState} from 'react'

// Initialize new context for students
const HeaderContext = createContext();

// We create a custom hook to provide immediate usage of the student context in other components
export const useHeaderContext = () => useContext(HeaderContext);

// StudentProvider component that holds initial state, returns provider component
export const HeaderProvider = ({ children }) => {
    const [headerProfileUsername, setHeaderProfileUsername] = useState("(loading...)")
    const [headerProfilePic, setHeaderProfilePic] = useState("empty")
    const initialState = {
        headerProfileUsername: headerProfileUsername,
        setHeaderProfileUsername: setHeaderProfileUsername,
        headerProfilePic, headerProfilePic,
        setHeaderProfilePic, setHeaderProfilePic
    };

    return (
        <HeaderContext.Provider value={initialState}>
      {/* Render children passed from props */}
      {children}
    </HeaderContext.Provider>
    )
}