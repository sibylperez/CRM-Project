import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const NEW_CLIENT = gql`
mutation newClient($input: ClientInput){
    newClient (input: $input) {
      id  
      name
      lastName
      company
      email
      phone
    }
  }
`;

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

const newClient = () => {
    //MUTATION CREATE NEW CLIENT
    const [ newClient ] = useMutation(NEW_CLIENT, {
        //Cache APOLLO
        update(cache, { data: newClient}) {
            //Cache object update
            const { getClientBySeller } = cache.readQuery({ query: GET_CLIENTS_SELLER});

            //Rewrite cache
            cache.writeQuery({
                query: GET_CLIENTS_SELLER,
                data: {
                    getClientBySeller : [...getClientBySeller, newClient ] 
                }
            })
        }
    });

    //Routing
    const router = useRouter();

    //VALIDATION FORM
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            phone: '',
        },
        validationSchema: yup.object({
            name: yup.string().min(2, 'Name must be at least 2 characters').required("Name is a required field"),
            lastName: yup.string().min(3, 'Lastname must be at least 3 characters').required("Lastname is a required field"),
            company: yup.string().min(4, 'Lastname must be at least 4 characters').required("Company is a required field"),
            email: yup.string().email('The email must be a valid email').required("Email is a required field"),
        }),
        onSubmit: async values => {
            //Sending the values
            const { name, lastName, company, email, phone } = values

           try {
            const { data } = await newClient({
                variables: {
                    input: {
                        name,
                        lastName,
                        company,
                        email, 
                        phone
                    }
                }
            });
            Swal.fire({
                title: 'Register Sucess', 
                text: `Client ${data.newClient.name} ${data.newClient.lastName} add successfully`, 
                icon: 'success', 
                timer: 2500
             });
             setTimeout(() => {
                router.push('/')
            }, 2500)
           } catch (error) {
            Swal.fire('Error', error.message, 'error')
           }
        }
    });

    return (
        <div>
            <Layout>
                <div className="flex justify-center">
                    <h1 className='text-[#5B57D4] text-3xl font-medium'>New Client</h1>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}>
                            {/* NAME */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='name'>Name</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='name'
                                    type='text'
                                    placeholder='Client Name'
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
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Lastname</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='lastName'
                                    type='text'
                                    placeholder='Client Lastname'
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
                            {/* COMPANY */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Company</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='company'
                                    type='text'
                                    placeholder='Client Company'
                                    value={formik.values.company}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                            </div>
                            {/* COMPANY ERROR */}
                            {formik.touched.company && formik.errors.company ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.company }</p>
                                </div>
                            ) : null}
                            {/* EMAIL */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Email</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='email'
                                    type='email'
                                    placeholder='Client Email'
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
                            {/* PHONE */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Phone</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='phone'
                                    type='tel'
                                    placeholder='Client Phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                            </div>
                            {/* SUBMIT */}
                            <input 
                            type='submit'
                            className='bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4]'
                            value='Register New Client'
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default newClient;