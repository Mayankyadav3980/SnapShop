import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const useCartItems = () => {
    const value = useContext(cartContext);
    console.log(value);
    
    return value;
}

export const CustomCartContext = ({children}) => {
    const [cartItems, setCartItems] = useState([{item:1}]);

    return (
      <cartContext.Provider value={{ cartItems, setCartItems }}>
        {children}
      </cartContext.Provider>
    );
}