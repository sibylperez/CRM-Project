import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    QUANTITY_PRODUCT,
    UPDATE_TOTAL
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
    const addProduct = productAdd => {
        //Updated state
        let newState;
        if(state.product.length > 0){
            newState = productAdd.map(product => {
                const newProduct = state.product.find(productState => productState.id === product.id)
                return{
                    ...product,
                    ...newProduct
                }
            })

        } else {
            newState = productAdd
        };

        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        })
    }
    //Change quantity in product
    const quantityProduct = newProduct => {
        dispatch({
            type: QUANTITY_PRODUCT,
            payload: newProduct
        })
    }
    //Update total
    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        })
    }


    return (
        <OrderContext.Provider
            value={{
                client: state.client,
                product: state.product,
                total: state.total,
                addClient,
                addProduct,
                quantityProduct,
                updateTotal
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState;