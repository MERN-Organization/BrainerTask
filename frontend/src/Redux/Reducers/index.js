import { combineReducers } from 'redux';
import { ProductReducer } from './ProductReducer';

const reducers = combineReducers({
    Products: ProductReducer
});

export default reducers;
