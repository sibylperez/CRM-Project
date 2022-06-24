import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import '../styles/globals.css';
//ORDER STATE REDUCER
import OrderSate from '../context/orders/OrderState';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderSate>
        <Component {...pageProps} />
      </OrderSate>
    </ApolloProvider>
  )
}

export default MyApp
