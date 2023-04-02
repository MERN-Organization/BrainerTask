import { ActionTypes } from '../Constants/ActionsTypes';
export const addProducts = (productData) => {
    return {
        type: ActionTypes.ADD_PRODUCTS,
        payload: productData
    };
};
