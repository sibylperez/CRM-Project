import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Table_Order from '../components/Table_Order';

const GET_ORDER_BY_SELLER = gql`
query getOrderBySeller{
  getOrderBySeller {
    id
    order { 
      id
      quantity
      name
    }
    total
    client {
      id
      name
      lastName
      email
      phone
    }
    seller
    state
  }
}
`


const Orders = () => {

  //QUERY
  const { data, loading } = useQuery(GET_ORDER_BY_SELLER)
  console.log(loading);
  if(loading) return 'Loading...'
  const { getOrderBySeller } = data

  return (
    <div>
      <Layout>
        <h1 className='text-[#5B57D4] text-3xl font-medium'>Orders</h1>
        <Link href='/neworder'>
          <a className='bg-[#1c1c3c] py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-[#5B57D4] mb-1 font-bold'>New Order</a>
        </Link>
        {loading ?
          <Loading />
          :
          <>
            {getOrderBySeller && getOrderBySeller?.length === 0 ? (
              <p className='mt-5 text-center text-2xl'> We don't have any orders </p>
            ) :
              (
                getOrderBySeller && getOrderBySeller?.map(order => (
                  <Table_Order 
                    key={order.id}
                    order={order}
                  />
                ))
              )
            }
          </>
        }
      </Layout>
    </div>
  )
}

export default Orders;