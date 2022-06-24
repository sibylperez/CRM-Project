import React, { useContext } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';


const Orders = () => {


  return (
    <div>
      <Layout>
        <h1 className='text-[#5B57D4] text-3xl font-medium'>Orders</h1>
        <Link href='/neworder'>
          <a className='bg-[#1c1c3c] py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-[#5B57D4] mb-1 font-bold'>New Order</a>
        </Link>
      </Layout>
    </div>
  )
}

export default Orders;