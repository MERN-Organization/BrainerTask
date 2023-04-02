import { ActionTypes } from '../Constants/ActionsTypes';
const initialState = {
    allProducts: []
};

export const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_PRODUCTS:
            const prevArray = state.allProducts;
            prevArray.push(payload);
            console.log('asdasdasdasd', { ...state, allProducts: prevArray });
            return { ...state, allProducts: prevArray };

        default:
            return state;
    }
};
