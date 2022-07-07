import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from 'sweetalert2';

const UPDATE_ORDER = gql`
mutation updateOrder($id: ID!, $input: OrderInput){
    updateOrder(id: $id, input: $input){
      state
    }
  }
`;

const DELETE_ORDER = gql`
mutation deleteOrder($id: ID!){
    deleteOrder(id: $id)
  }
`;

const GET_ORDER_BY_SELLER = gql`
query getOrderBySeller{
  getOrderBySeller {
    id
  }
}
`

const Table_Order = ({order}) => {
    
    const { id, total, client: {name, lastName, email, phone }, state } = order;

    //MUTATION
    const [ updateOrder ] = useMutation(UPDATE_ORDER);
    const [ deleteOrder ] = useMutation(DELETE_ORDER, {
        update(cache){
            const { getOrderBySeller } = cache.readQuery({
                query: GET_ORDER_BY_SELLER
            });
            cache.writeQuery({
                query: GET_ORDER_BY_SELLER,
                data : {
                    getOrderBySeller: getOrderBySeller.filter(order => order.id !== id)
                }
            })
        }
    })

    //ORDER STATE
    const [ stateOrder, setStateOrder ] = useState(state);
    //STATE COLOR
    const [ color, setColor ] = useState('')

    useEffect(() => {
        if(stateOrder){
            setStateOrder(stateOrder)
        }
        colorOrder();
    }, [stateOrder])

    //FUNCTION COLOR STATE
    const colorOrder = () => {
        if(stateOrder === 'PENDING'){
            setColor('border-yellow-500')
        } else if (stateOrder === 'COMPLETE'){
            setColor('border-green-500')
        } else {
            setColor('border-red-700')
        }
    }

    //FUNCTION VALUE STATE
    const changeState = async newState => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        client: order.client.id,
                        state: newState
                    }
                }
            });
            setStateOrder(data.updateOrder.state)
        } catch (error) {
            console.log(error)
        }
    }

    //DELETE ORDER
    const confirmDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete this order?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Delete by ID
                    const { data } = await deleteOrder({
                        variables: {
                            id
                        }
                    });
                    //Alert
                    Swal.fire({
                        title: 'Deleted!',
                        text: data.deleteOrder,
                        icon: 'success',
                        timer: 2500
                    }) 
                } catch (error) {
                    Swal.fire('Error', error.message, 'error')
                }
            }
          })
    }
    

    return(
        <div className={` ${color} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Client: {name} {lastName}</p>
                { email && (
                    <p className="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {email}
                    </p>
                )}

                { phone && (
                    <p className="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {phone}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Order State:</h2>
                <select
                    className="mt-2 appearance-none bg-[#5B57D4] border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-[#5B57D4] focus:border-blue-600 uppercase text-xs font-bold"
                    value={stateOrder}
                    onChange={ e => changeState(e.target.value)}
                >
                    <option value='COMPLETE'> COMPLETE</option> 
                    <option value='PENDING'>PENDING</option>
                    <option value='CANCELLED'>CANCELLED</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order Resume</h2>
                {order.order.map( item => (
                    <div key={item.id} 
                         className='mt-4'>
                        <p className="text-sm text-gray-600">Product: {item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                ))}
                <p className="text-gray-800 mt-3 font-bold">Total payment: 
                    <span className="font-light"> $ {total}</span>
                </p>

                <button className="flex items-center mt-4 bg-red-700 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
                        onClick={ () => confirmDelete()}>
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default Table_Order;