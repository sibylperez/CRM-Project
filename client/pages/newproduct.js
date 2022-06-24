import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const CREATE_PRODUCT = gql`
mutation newProduct($input: ProductInput){
    newProduct (input: $input){
      id
      name
      stock
      price
    }
  }
`;

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


const newProduct = () => {
    //MUTATION
    const [ newProduct ] = useMutation(CREATE_PRODUCT, {
        //Cache APOLLO
        update(cache, { data: {newProduct}}) {
            //Cache object update
            const { getProducts } = cache.readQuery({ query: GET_PRODUCTS});

            //Rewrite cache
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts : [...getProducts, newProduct ] 
                }
            })
        }
    });

    //ROUTING
    const router = useRouter();

    //FORMIK
    const formik = useFormik({
        initialValues: {
            name: '',
            stock: '',
            price: ''
        },
        validationSchema: yup.object({
            name: yup.string().min(4, 'Name must be at least 4 characters').required("Name is a required field"),
            stock: yup.number().required("Stock is a required field").positive("Stock must be a positive number").integer("Stock must be an integer"),
            price: yup.number().required("Price is a required field").positive("Stock must be a positive number")
        }),
        onSubmit: async values => {
            //Send the values
            const { name, stock, price } = values;

            try {
                const { data } = await newProduct({
                    variables: {
                        input: {
                            name,
                            stock,
                            price
                        }
                    }
                });
                Swal.fire({
                    title: 'Register Sucess', 
                    text: `Product ${data.newProduct.name} add successfully`, 
                    icon: 'success', 
                    timer: 2500
                 });
                 setTimeout(() => {
                    router.push('/products')
                }, 2500)
            } catch (error) {
                Swal.fire('Error', error.message, 'error')
            }
        }
    })

    return (
        <>
            <Layout>
                <div className="flex justify-center">
                    <h1 className='text-[#5B57D4] text-3xl font-medium'>New Product</h1>
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
                                    placeholder='Name Product'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* NAME ERROR */}
                            {formik.touched.name && formik.errors.name ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}
                            {/* STOCK */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='stock'>Stock</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='stock'
                                    type='number'
                                    placeholder='Stock Product'
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* STOCK ERROR */}
                            {formik.touched.stock && formik.errors.stock ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.stock}</p>
                                </div>
                            ) : null}
                            {/* PRICE */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='price'>Price</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='price'
                                    type='number'
                                    placeholder='Price Product'
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* PRICE ERROR */}
                            {formik.touched.price && formik.errors.price ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.price}</p>
                                </div>
                            ) : null}
                            {/* SUBMIT */}
                            <input 
                            type='submit'
                            className='bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4]'
                            value='Register New Product'
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default newProduct;