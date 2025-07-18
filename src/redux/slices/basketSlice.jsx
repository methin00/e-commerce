import { createSlice } from "@reduxjs/toolkit";

export const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    try {
      return JSON.parse(localStorage.getItem("basket"));
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

const initialState = {
  productsIn: getBasketFromStorage(),
  count: 0,
  subTotal: 0,
};

export const addBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};


const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existing = state.productsIn.find((p) => p.id == action.payload.id);
      if (existing) {
        existing.count += action.payload.count;
      } else {
        state.productsIn.push(action.payload);
      }
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    removeFromBasket: (state, action) => {
      const isExist = state.productsIn.find((p) => p.id == action.payload.id)
      if (isExist) {
        if (isExist.count > 1) {
          isExist.count -= 1
        }
        else if (isExist.count == 1) {
          state.productsIn = state.productsIn.filter((p) => p.id != action.payload.id)
        }
      }
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload
    }
  },
});

export const { addToBasket, setCount, removeFromBasket, setSubTotal } = basketSlice.actions;
export default basketSlice.reducer;
