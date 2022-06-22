import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';

const GET_CLIENTS_SELLER = gql`
query getClientBySeller {
  getClientBySeller {
    id
    name
    lastName
    company
    email
    phone
    dataCreate
  }
}
`;

const Index = () => {

  //Get info from Apollo
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  return (
    <div>
      <Layout>
        <h1 className='text-[#5B57D4] text-3xl font-medium'>Clients</h1>
        { loading ? 
          <Loading />
        : 
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-[#1c1c3c]">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data && data?.getClientBySeller.map(client => (
              <tr key={client.id}>
                <td className="border px-4 py-2"> {client.name} </td>
                <td className="border px-4 py-2"> {client.company}</td>
                <td className="border px-4 py-2"> {client.email} </td>
              </tr>
            ))}
          </tbody>
          </table>
        }
      </Layout>
    </div>
  )
}

export default Index;