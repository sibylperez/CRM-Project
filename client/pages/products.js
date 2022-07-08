import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Loading from '../components/Loading';
import Table_Product from '../components/Table_Product';

const GET_PRODUCTS = gql`
query getProducts {
  getProducts {
    id
    name
    stock
    price
  }
}
`;

const Products = () => {

  //Get info from Apollo
  const { data, loading } = useQuery(GET_PRODUCTS);
  console.log(loading)

  return (
    <div>
      <Layout>
        <h1 className='text-[#5B57D4] text-3xl font-medium'>Products</h1>
        <Link href='/newproduct'>
          <a className='bg-[#1c1c3c] py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-[#5B57D4] mb-1 font-bold'>Add Product</a>
        </Link>
        {loading ?
          <Loading />
          :
          <div className='overflow-x-scroll'>
            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-[#1c1c3c]">
                <tr className="text-white">
                  <th className="w-1/5 py-2">Name</th>
                  <th className="w-1/5 py-2">Stock</th>
                  <th className="w-1/5 py-2">Price</th>
                  <th className="w-1/5 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data && data?.getProducts.map(product => (
                  <Table_Product
                    key={product.id}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
          </div>
        }
      </Layout>
    </div>
  )
}

export default Products;