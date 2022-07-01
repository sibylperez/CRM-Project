import React, { useContext } from "react";
import { useMutation, gql } from '@apollo/client'
import Layout from '../components/Layout';
import SelectClient from "../components/orders/SelectClient";
import SelectProducts from "../components/orders/SelectProducts";
import ResumenOrder from "../components/orders/ResumenOrder";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
//CONTEXT
import OrderContext from '../context/orders/OrderContext';
import TotalOrder from "../components/orders/TotalOrder";

const NEW_ORDER = gql `
mutation newOrder($input: OrderInput){
    newOrder(input: $input){
      id
    }
  }
`;


const NewOrder = () => {
    //READING CONTEXT
    const ordercontext = useContext(OrderContext);
    const { client, product, total } = ordercontext
    
    //MUTATION
    const [ newOrder ] = useMutation(NEW_ORDER)

    //Routing
    const router = useRouter();

    //Validation - disabled button
    const validationOrder = () => {
        return !product.every(products => products.quantity > 0) || total === 0 || client.length === 0 || product.length === 0
         ? "opacity-50 cursor-not-allowed" : ""
    }  

    //Submit Order
    const submitOrder = async () => {
        //Sending info required inside Mutation
        const { id } = client
        const order = product.map(( { stock, __typename, ...product } ) => product)
        

        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order
                    }
                }
            });
            Swal.fire({
                title: 'Register Sucess', 
                text: `Order register successfully`, 
                icon: 'success', 
                timer: 2500
             });
             setTimeout(() => {
                router.push('/orders')
            }, 2500)
        } catch (error) {
            Swal.fire('Error', error.message, 'error')  
        }
    }


    return (
        <div>
            <Layout>
                <div className="flex justify-center">
                    <h1 className='text-[#5B57D4] text-3xl font-medium'>New Order</h1>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <SelectClient />
                        <SelectProducts />
                        <ResumenOrder />
                        <TotalOrder />

                        <button
                            type="button"
                            className={`bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4] ${validationOrder()}`}
                            onClick={() => submitOrder()}
                        >
                            Register Order
                        </button>
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default NewOrder;