import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout';

const Register = () => {
  return (
    <div>
      <Layout>
            <h1 className='text-[#1c1c3c] text-center text-3xl font-black'>Register</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-[#1c1c3c] rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                        {/* NAME */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='name'>
                                Name
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='name'
                            type='text'
                            placeholder='User name'
                            />
                        </div>
                        {/* LASTNAME */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='lastname'>
                                Lastname
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='lastname'
                            type='text'
                            placeholder='User Lastname'
                            />
                        </div>
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
                        value='Register'
                        />
                        <div className='flex mt-6 flex-col'>
                            <h2 className='flex text-white justify-center'>
                                Have already account?
                            </h2>
                            <Link href="/login">
                                <a className="flex mt-2 text-white justify-center underline hover:text-[#31ff70] font-light">
                                    Login here
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

export default Register;