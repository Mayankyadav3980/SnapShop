import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const useUserDetails = () => {
    const values = useContext(userContext);
    return values;
}

export const CustomUserContext = ({children}) => {
    const [userDetails, setUserDetails] = useState({});

    return (
      <userContext.Provider value={{ userDetails, setUserDetails }}>
        {children}
      </userContext.Provider>
    );
}

