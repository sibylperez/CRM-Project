import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    QUANTITY_PRODUCT
} from '../../types'

const OrderState = ({children}) => {
    //Initial State
    const initialState = {
        client: {},
        product: [],
        total: 0
    }

    //REDUCER
    const [ state, dispatch] = useReducer(OrderReducer, initialState);

    //Add client in Order
    const addClient = client => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })
    }
    //Add product in Order
    const addProduct = product => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: product
        })
    }


    return (
        <OrderContext.Provider
            value={{
                addClient,
                addProduct
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState;