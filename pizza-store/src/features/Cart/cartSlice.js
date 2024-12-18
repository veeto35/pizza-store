import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state,action) => {
            //payload = new item
            state.cart.push(action.payload);
        },
        deleteItem: (state,action)=>{
            //payload = item id
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        },
        increaseItemQuantity: (state,action) =>{
            const item = state.cart.find(item=> item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
            
            
        },
        descreaseItemQuantity: (state,action)=> {
            const item = state.cart.find(item=> item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if(item.quantity === 0 ) {
                cartSlice.caseReducers.deleteItem(state,action);
            }
        },
        clearCart: (state,action) =>{
            state.cart = [];
        },
    }
});

export const {addItem,deleteItem,increaseItemQuantity,descreaseItemQuantity,clearCart} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;


export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum,element) => sum + element.quantity,0);

export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum,element) => sum + element.unitPrice,0);

export const getCurrentQuantityById = (pizzaId) => (state) => state.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity ?? 0;


export default cartSlice.reducer;