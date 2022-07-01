import React, { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/orders/OrderContext";

const ResumenProduct = ({products}) => {

    const { name, price } = products; 

    //CONTEXT
    const ordercontext = useContext(OrderContext);
    const { quantityProduct, updateTotal } = ordercontext

    //LOCAL STATE
    const [quantity,  setQuantity] = useState(0);

    useEffect(() => {
      updateQuantity()
      updateTotal()
    }, [quantity])

    //UPDATE QUANTITY
    const updateQuantity = () => {
        const newProduct = {...products, quantity: Number(quantity)}
        quantityProduct(newProduct)
    }
    

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm"> {name} </p>
                <p>$ {price}</p>
            </div>
            <input
                type='number' 
                placeholder="Quantity"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={e => setQuantity(e.target.value)}
                value={quantity}
            />
        </div>
    )
};

export default ResumenProduct;