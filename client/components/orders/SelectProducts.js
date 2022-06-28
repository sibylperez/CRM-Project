import React, { useState, useEffect, useContext } from "react";
import Select from 'react-select';
import { useQuery, gql } from "@apollo/client";
import OrderContext from "../../context/orders/OrderContext";
import Loading from "../Loading";

const GET_PRODUCTS = gql`
query getProducts {
  getProducts {
    id
    name
    stock
    price
  }
}
`;

const SelectProducts = () => {
    //State 
    const [product, setProduct] = useState([]);

    //CONTEXT
    const ordercontext = useContext(OrderContext);
    const { addProduct } = ordercontext

    //QUERY
    const { data, loading } = useQuery(GET_PRODUCTS);
    //console.log(loading)

    useEffect(() => {
        addProduct(product)
    }, [product])

    //FUNCTION SELECT
    const selectOneProduct = products => {
        setProduct(products)
    }

    if(loading) return 'Loading...'

    const { getProducts } = data
    //console.log(getProducts)

    return (
        <div>
            {loading ?
                <Loading />
                :
                <>
                    <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                        1.- Select one or more products to the order
                    </p>
                    <Select
                        className="mt-3"
                        options={getProducts}
                        isMulti={true}
                        onChange={option => selectOneProduct(option)}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => `${option.name} - ${option.stock} available`}
                        placeholder='Select Products'
                    />
                </>
            }
        </div>
    )
};

export default SelectProducts;