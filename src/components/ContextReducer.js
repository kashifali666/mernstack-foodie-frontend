import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Check if item with same ID and option already exists
      const existingItemIndex = state.findIndex(
        (food) => food.id === action.id && food.size === action.size
      );

      if (existingItemIndex !== -1) {
        // If the same item with the same size exists, update qty and price
        const updatedState = [...state];
        updatedState[existingItemIndex] = {
          ...updatedState[existingItemIndex],
          qty: updatedState[existingItemIndex].qty + parseInt(action.qty),
          price: updatedState[existingItemIndex].price + action.price,
        };
        return updatedState;
      } else {
        // Otherwise, add as a new item
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img || "", // Default if img is undefined
          },
        ];
      }

    case "REMOVE":
      // Remove item by index
      return state.filter((_, index) => index !== action.index);

    case "UPDATE":
      // Update quantity and price for an existing item
      const itemIndex = state.findIndex(
        (food) => food.id === action.id && food.size === action.size
      );

      if (itemIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          qty: action.qty,
          price: action.price,
        };
        return updatedCart;
      }
      return state;

    case "DROP":
      let empArray = [];
      return empArray;

    default:
      console.error("Error in Reducer: Unknown action type", action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
