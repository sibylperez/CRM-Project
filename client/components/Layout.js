import React from 'react';
import Head from 'next/head'
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/router';

const Layout = ({children}) => {
    //routing
    const router = useRouter();

    return (
        <>
            <Head>
                <title>CRM - Client administration</title>
            </Head>

            {router.pathname === '/login' || router.pathname === '/register' ? 
            //LOGIN
            <div className=" bg-[url('../img/crmbg.jpg')] min-h-screen flex flex-col justify-center">
                <div>
                    {children}  
                </div>
            </div>
        : 
            //USER AUTHENTICATED
            <div className=" bg-slate-300 min-h-screen">
                <div className="sm:flex min-h-screen">
                    <Sidebar />
                    <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                        <Header />
                        {children}         
                    </main>
                </div>
            </div>
        }
        </>
    );
}

export default Layout;
