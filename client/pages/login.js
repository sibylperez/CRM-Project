import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';

const AUTETICATION_USER = gql`
mutation  autenticationUser($input: AutenticaInput){
    autenticationUser(input: $input) {
      token
    }
  }
`;

const Login = () => {

     //MUTATION CREATE AUTENTICATION USER
     const [ autenticationUser ] = useMutation(AUTETICATION_USER);

     //ROUTING
    const router = useRouter();

     //VALIDATION FORM
     const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object ({
            email: yup.string().email('The email must be a valid email').required("Email is a required field"),
            password: yup.string().required('Password is a required field')
        }),
        onSubmit: async values => {
            //Sending the values
            const { email, password } = values;

            try {
                //Autentication user with the values
                const { data } = await autenticationUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                //Saving token in localStorage
                const token = data.autenticationUser.token;
                
                localStorage.setItem('token', token)

                //Message to sucess
                Swal.fire({
                    title: 'Authenticating...', 
                    icon: 'success', 
                    timer: 2000
                 });
                 setTimeout(() => {
                     router.push('/')
                 }, 2000)
            } catch (error) {
                Swal.fire('Error', error.message, 'error')
            }
        }
     })

  return (
    <div>
      <Layout>
            <h1 className='text-[#1c1c3c] text-center text-3xl font-black'>Login</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-[#1c1c3c] rounded shadow-md px-8 pt-6 pb-8 mb-4'
                          onSubmit={formik.handleSubmit}>
                        {/* EMAIL */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='email'
                            type='email'
                            placeholder='User email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {/* EMAIL ERROR */}
                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email }</p>
                            </div>
                        ) : null}
                        {/* PASSWORD */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='password'
                            type='password'
                            placeholder='User password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {/* PASSWORD ERROR */}
                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password }</p>
                            </div>
                        ) : null}
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