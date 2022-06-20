import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout';

const Login = () => {
  return (
    <div>
      <Layout>
            <h1 className='text-[#1c1c3c] text-center text-3xl font-black'>Login</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-[#1c1c3c] rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                        {/* EMAIL */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='email'
                            type='email'
                            placeholder='User email'
                            />
                        </div>
                        {/* PASSWORD */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='password'
                            type='password'
                            placeholder='User password'
                            />
                        </div>
                        {/* SUBMIT */}
                        <input 
                        type='submit'
                        className='bg-[#707070] w-full mt-5 p-2 text-white uppercase hover:bg-blue-800'
                        value='Login'
                        />
                        <div className='flex mt-6 flex-col'>
                            <h2 className='flex text-white justify-center'>
                                Don't have an account?
                            </h2>
                            <Link href="/register">
                                <a className="flex mt-2 text-white justify-center underline hover:text-[#31ff70] font-light">
                                    Create an account
                                </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Login;