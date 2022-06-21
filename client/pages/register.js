import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';

const NEW_USER = gql`
mutation newUser($input: UserInput){
    newUser(input: $input){
      id
      name
      lastName
      email
      dataCreate
    }
  }
`;


const Register = () => {

    //MUTATION CREATE NEW USER
    const [newUser] = useMutation(NEW_USER);
    //ROUTING
    const router = useRouter();

    //VALIDATION FORM
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            name: yup.string().min(6, 'Name must be at least 6 characters').required("Name is a required field"),
            lastName: yup.string().min(6, 'Lastname must be at least 6 characters').required("Lastname is a required field"),
            email: yup.string().email('The email must be a valid email').required("Email is a required field"),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is a required field')
        }),
        onSubmit: async values => {
            //Sending the values
            const { name, lastName, email, password } = values

            try {
                //Create new User
               const { data }= await newUser({
                variables: {
                    input: {
                        name,
                        lastName, 
                        email,
                        password
                    }
                }
               });
               Swal.fire({
               title: 'Register Sucess', 
               text: `User ${data.newUser.name} successfully created`, 
               icon: 'success', 
               timer: 2500
            });
            setTimeout(() => {
                router.push('/login')
            }, 2500)
            } catch (error) {
                Swal.fire('Error', error.message, 'error')
            }
        }
    });

  return (
    <div>
      <Layout>
            <h1 className='text-[#1c1c3c] text-center text-3xl font-black'>Register</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-[#1c1c3c] rounded shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={formik.handleSubmit}>
                        {/* NAME */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='name'>
                                Name
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='name'
                            type='text'
                            placeholder='User name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {/* NAME ERROR */}
                        {formik.touched.name && formik.errors.name ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.name }</p>
                            </div>
                        ) : null}
                        {/* LASTNAME */}
                        <div className='mb-4'>
                            <label className='block text-[#65F7D1] text-sm fold-bold mb-2' htmlFor='lastName'>
                                Lastname
                            </label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                            id='lastName'
                            type='text'
                            placeholder='User lastname'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {/* LASTNAME ERROR */}
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.lastName }</p>
                            </div>
                        ) : null}
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