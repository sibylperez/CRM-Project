import React from "react";

const TotalOrder = () => {

    const total = 200;
    return(
        <div className="flex items-center mt-5 justify-between bg-gray-100 p-3  border-solid border-2 border-gray-400">
            <h2 className="text-gray-800 text-lg">Total payment:</h2>
            <p className="text-gray-800 mt-0">$ {total}</p>
        </div>
    )
};

export default TotalOrder;