import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery, gql } from '@apollo/client';
import Layout from "../components/Layout";
import Loading  from '../components/Loading';

const TOP_SELLERS = gql`
query topSellers{
    topSellers {
      seller {
        name
        email
      }
      total
    }
  }
`

const BestSellers = () => {

    //QUERY
    const { data, loading } = useQuery(TOP_SELLERS);
    console.log(loading)

    const { topSellers } = data

    //Data Sellers
    const sellerGraph = [];

    topSellers.map((seller, index) => {
        sellerGraph[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })

    return (
        <div>
            <Layout>
                <h1 className='text-[#5B57D4] text-3xl font-medium'>Best Sellers</h1>
                {loading ?
                    <Loading />
                    :
                    <ResponsiveContainer width="70%" height="80%">
                        <BarChart
                            className='mt-10'
                            width={600}
                            height={500}
                            data={sellerGraph}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#8884d8" />

                        </BarChart>
                    </ResponsiveContainer>
                }
            </Layout>
        </div>
    )
}

export default BestSellers;