import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";
import ResumenProduct from "./ResumenProduct";

const ResumenOrder = () => {
    //CONTEXT
    const ordercontext = useContext(OrderContext)
    const { product } = ordercontext

    console.log(product)

    return (
        <div>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                3.- Adjust product quantities
            </p>
            {product.length > 0 ?
                <div>
                    { product.map(item => (
                        <ResumenProduct 
                            key={item.id}
                            products={item}
                        />
                    ))}
                </div>
                :

                <div className="flex mt-5 text-sm font-bold">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                   Products not yet selected
                </div>
            }
        </div>
    )
}

export default ResumenOrder;