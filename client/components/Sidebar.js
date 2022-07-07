import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
    //routing next
    const router = useRouter();
    return (
        <aside className="bg-[#1c1c3c] sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <h1 className='text-[#65F7D1] text-3xl font-black'>CRM Clients</h1>
            </div>
            <nav className='mt-5 list-none'>
                <li className={router.pathname === '/' ? 'bg-blue-800 p-3' : 'p-3'}>
                    <Link href="/">
                        <a className={router.pathname === '/' ? 'text-[#31ff70] block' : 'text-white block'}>
                            Clients
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/orders' ? 'bg-blue-800 p-3' : 'p-3'}>
                    <Link href="/orders">
                        <a className={router.pathname === '/orders' ? 'text-[#31ff70] block' : 'text-white block'}>
                            Orders
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/products' ? 'bg-blue-800 p-3' : 'p-3'}>
                    <Link href="/products">
                        <a className={router.pathname === '/products' ? 'text-[#31ff70] block' : 'text-white block'}>
                            Products
                        </a>
                    </Link>
                </li>
            </nav>
            <nav className='mt-5 list-none'>
            <div className='mt-10'>
                <h1 className='text-[#65F7D1] text-2xl font-bold'>Others Options</h1>
            </div>
                <li className={router.pathname === '/bestsellers' ? 'bg-blue-800 p-3' : 'p-3'}>
                    <Link href="/bestsellers">
                        <a className={router.pathname === '/bestsellers' ? 'text-[#31ff70] block' : 'text-white block'}>
                            Best Sellers
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/bestclients' ? 'bg-blue-800 p-3' : 'p-3'}>
                    <Link href="/bestclients">
                        <a className={router.pathname === '/bestclients' ? 'text-[#31ff70] block' : 'text-white block'}>
                            Best Clients
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar;