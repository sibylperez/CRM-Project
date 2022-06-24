import React, { useState, useEffect, useContext } from "react";
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import Loading from "../Loading";
import OrderContext from "../../context/orders/OrderContext";

const GET_CLIENTS_SELLER = gql`
query getClientBySeller {
  getClientBySeller {
    id
    name
    lastName
    company
    email
    phone
    dataCreate
  }
}
`;

const SelectClient = () => {
    //Clients State
    const [client, setClient] = useState([]);

    //CONTEXT
    const ordercontext = useContext(OrderContext)
    const { addClient } = ordercontext

    //QUERY
    const { data, loading } = useQuery(GET_CLIENTS_SELLER);
    console.log(loading);
    //
    useEffect(() => {
        addClient(client)
    }, [client])

    //Function select
    const selectOneClient = clients => {
        setClient(clients)
    }


    const { getClientBySeller } = data

    return (
        <div>
            {loading ?
                <Loading />
                :
                <>
                    <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                        1.- Assign a client to the order
                    </p>
                    <Select
                        className="mt-3"
                        options = {getClientBySeller}
                        onChange={option => selectOneClient(option)}
                        getOptionValue = {option => option.id}
                        getOptionLabel = {option => `${option.name} ${option.lastName}`}
                        placeholder='Select Client'
                    />
                </>
            }
        </div>
    )
};

export default SelectClient;