import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const TotalOrder = () => {

    //CONTEXT Total
    const ordercontext = useContext(OrderContext);
    const { total } = ordercontext;

    return(
        <div className="flex items-center mt-5 justify-between bg-gray-100 p-3  border-solid border-2 border-gray-400">
            <h2 className="text-gray-800 text-lg">Total payment:</h2>
            <p className="text-gray-800 mt-0">$ {total}</p>
        </div>
    )
};

export default TotalOrder;