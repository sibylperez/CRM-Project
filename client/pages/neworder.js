import React, { useContext } from "react";
import Layout from '../components/Layout';
import SelectClient from "../components/orders/SelectClient";
import SelectProducts from "../components/orders/SelectProducts";
import ResumenOrder from "../components/orders/ResumenOrder";
//CONTEXT
import OrderContext from '../context/orders/OrderContext';
import TotalOrder from "../components/orders/TotalOrder";


const NewOrder = () => {
    //READING CONTEXT
    const ordercontext = useContext(OrderContext)


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
                            className={`bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4]`}
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