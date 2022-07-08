import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery, gql } from '@apollo/client';
import Layout from "../components/Layout";
import Loading  from '../components/Loading';

const TOP_CLIENTS = gql`
query topClients{
    topClients {
      client {
        name
        company
      }
      total
    }
  }
`

const BestClients = () => {
        //QUERY
        const { data, loading, startPolling, stopPolling } = useQuery(TOP_CLIENTS);

        //UPDATED REAL TIME
        useEffect(() => {
            startPolling(1000);
            return () => {
                stopPolling();
            }
        }, [startPolling, stopPolling])
        
        if(loading) return 'Loading...'
    
        
        const { topClients } = data
    
        //Data Sellers
        const clientGraph = [];
    
        topClients.map((client, index) => {
            clientGraph[index] = {
                ...client.client[0],
                total: client.total
            }
        })
    
        return (
            <div>
                <Layout>
                    <h1 className='text-[#5B57D4] text-3xl font-medium'>Best Clients</h1>
                    {loading ?
                        <Loading />
                        :
                        <ResponsiveContainer width="70%" height="80%">
                            <BarChart
                                className='mt-10'
                                width={600}
                                height={500}
                                data={clientGraph}
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
                                <Bar dataKey="total" fill="#6114F5" />
    
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </Layout>
            </div>
        )
    }

export default BestClients;