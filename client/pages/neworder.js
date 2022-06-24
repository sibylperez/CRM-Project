import React, { useContext } from "react";
import Layout from '../components/Layout';
import SelectClient from "../components/orders/SelectClient";
import SelectProducts from "../components/orders/SelectProducts";
//CONTEXT
import OrderContext from '../context/orders/OrderContext';


const NewOrder = () => {
  //READING CONTEXT
  const ordercontext = useContext(OrderContext)


    return (
        <div>
            <Layout>
                <div className="flex justify-center">
                    <h1 className='text-[#5B57D4] text-3xl font-medium'>New Order</h1>
                </div>
                <SelectClient />
                <SelectProducts />
            </Layout>
        </div>
    )
};

export default NewOrder;