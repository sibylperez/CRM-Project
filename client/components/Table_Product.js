import React from "react";
import Swal from "sweetalert2";
import Router from 'next/router'
import { useMutation, gql } from '@apollo/client'

const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!){
    deleteProduct(id: $id)
  }
`;

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

const Table_Product = ({ product }) => {
    const { id, name, stock, price } = product

      //MUTATION
      const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
        update(cache){
            const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

            //Rewrite cache
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts : getProducts.filter(product => product.id !== id)
                }
            })
        }
    })

     //EDIT CLIENT
     const updatedProduct = id => {
        Router.push({
            pathname: "/editproduct/[id]",
            query: { id }
        })
    }

     //DELETE CLIENT
     const deleteProductId = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the product "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Delete by ID
                    const { data } = await deleteProduct({
                        variables: {
                            id
                        }
                    });
                    //Alert
                    Swal.fire({
                        title: 'Deleted!',
                        text: data.deleteProduct,
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
        <tr key={product.id}>
        <td className="border px-4 py-2"> {name} </td>
        <td className="border px-4 py-2"> {stock} units</td>
        <td className="border px-4 py-2"> $ {price} </td>
        <td className="border px-4 py-2 flex">
            <button
                type="button"
                className="flex justify-center item-center bg-green-700 py-2 px-4 w-full text-white rounded text-s uppercase mr-2"
                onClick={()=> updatedProduct(id)}
            >
                Edit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button
                type="button"
                className="flex justify-center item-center bg-red-700 py-2 px-4 w-full text-white rounded text-s uppercase"
                onClick={()=> deleteProductId(id)}
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

export default Table_Product;