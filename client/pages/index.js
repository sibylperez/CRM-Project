import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import Loading from '../components/Loading';
import Link from 'next/link';
import Table_Client from '../components/Table_Client';

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

  //Routing
  const router = useRouter()

  //Get info from Apollo
  const { data, loading } = useQuery(GET_CLIENTS_SELLER);

  if (loading) return 'Loading...';

  //user no authenticated
  const noAuth = () => {
    router.push("/login");
  };


  return (
    <div>
      {localStorage.getItem('token') ? 
      <Layout>
        <h1 className='text-[#5B57D4] text-3xl font-medium'>Clients</h1>
        <Link href='/newclient'>
          <a className='bg-[#1c1c3c] py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-[#5B57D4] mb-1 font-bold'>Add Client</a>
        </Link>
        { loading ? 
          <Loading />
        : 
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-[#1c1c3c]">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data && data?.getClientBySeller.map(client => (
              <Table_Client 
                key={client.id}
                client = {client}
              />
            ))}
          </tbody>
          </table>
        }
      </Layout>
    : (
      noAuth()
    )}
    </div>
  )
}

export default Index;