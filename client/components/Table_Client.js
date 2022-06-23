import React from "react";
import Swal from "sweetalert2";
import Router from 'next/router'
import { useMutation, gql } from '@apollo/client'

const DELETE_CLIENT = gql`
mutation deleteClient($id: ID!){
    deleteClient(id: $id)
  }
`;

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

const Table_Client = ({ client }) => {

    const { id, name, lastName, company, email } = client

    //MUTATION 
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        update(cache){
            const { getClientBySeller } = cache.readQuery({ query: GET_CLIENTS_SELLER });

            //Rewrite cache
            cache.writeQuery({
                query: GET_CLIENTS_SELLER,
                data: {
                    getClientBySeller : getClientBySeller.filter(client => client.id !== id)
                }
            })
        }
    })

    //EDIT CLIENT
    const updatedClient = id => {
        Router.push({
            pathname: "/editclient/[id]",
            query: { id }
        })
    }

    //DELETE CLIENT
    const deleteClientId = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the client "${name} ${lastName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Delete by ID
                    const { data } = await deleteClient({
                        variables: {
                            id
                        }
                    });
                    console.log(data)
                    //Alert
                    Swal.fire({
                        title: 'Deleted!',
                        text: data.deleteClient,
                        icon: 'success',
                        timer: 2500
                    }) 
                } catch (error) {
                    Swal.fire('Error', error.message, 'error')
                }
            }
          })
    }

    return (
        <tr key={client.id}>
            <td className="border px-4 py-2"> {name} {lastName} </td>
            <td className="border px-4 py-2"> {company}</td>
            <td className="border px-4 py-2"> {email} </td>
            <td className="border px-4 py-2 flex">
                <button
                    type="button"
                    className="flex justify-center item-center bg-green-700 py-2 px-4 w-full text-white rounded text-s uppercase mr-2"
                    onClick={()=> updatedClient(id)}
                >
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-700 py-2 px-4 w-full text-white rounded text-s uppercase"
                    onClick={()=> deleteClientId(id)}
                >
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    )
};

export default Table_Client;