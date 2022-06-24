import React from "react";
import { useRouter } from "next/router";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from "sweetalert2";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const GET_PRODUCT_BY_ID = gql`
query getProductById($id: ID!){
    getProductById(id: $id){
      id
      name
      stock
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
mutation updateProduct($id: ID!, $input: ProductInput){
    updateProduct(id: $id, input: $input){
      id
      name
      stock
      price
    }
  }
`;

const EditProduct = () => {
    //Get ID
    const router = useRouter();
    const { query: {id} } = router;
    //QUERY

    const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id
        }
    });

    //MUTATION
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

    //Schema Validation
    const schemaValidation = yup.object({
        name: yup.string().min(4, 'Name must be at least 4 characters').required("Name is a required field"),
        stock: yup.number().required("Stock is a required field").positive("Stock must be a positive number").integer("Stock must be an integer"),
        price: yup.number().required("Price is a required field").positive("Stock must be a positive number")
    });

    if(loading) return 'Loading...'

    const { getProductById } = data;
    //console.log(getProductById)

    //FUNCTION UPDATE
    const updateInfoProduct = async values => {
        //Send values
        const { name, stock, price } = values
        try {
            const { data } = await updateProduct({
                variables: {
                    id,
                    input: {
                        name,
                        stock,
                        price
                    }
                }
            })
            Swal.fire({
                title: 'Edit Sucess', 
                text: `Product ${data.updateProduct.name} was successfully edited`, 
                icon: 'success', 
                timer: 2000
             });
             setTimeout(() => {
                 router.push('/products')
            }, 2500)
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    return (
        <div>
            <Layout>
            <div className="flex justify-center">
                <h1 className='text-[#5B57D4] text-3xl font-medium'>Edit Product</h1>
            </div>
        { loading ? 
                <Loading />
            : 
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <Formik 
                        validationSchema={ schemaValidation }
                        enableReinitialize
                        initialValues={ getProductById }
                        onSubmit = { (values) => {
                            updateInfoProduct(values)
                        }}
                    >
                        {props =>{
                            return (
                                <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}>
                                {/* NAME */}
                                <div className='mb-4'>
                                    <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='name'>Name</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                        id='name'
                                        type='text'
                                        placeholder='Name Product'
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {/* NAME ERROR */}
                                {props.touched.name && props.errors.name ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.name}</p>
                                    </div>
                                ) : null}
                                {/* STOCK */}
                                <div className='mb-4'>
                                    <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='stock'>Stock</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                        id='stock'
                                        type='number'
                                        placeholder='Stock Product'
                                        value={props.values.stock}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {/* STOCK ERROR */}
                                {props.touched.stock && props.errors.stock ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.stock}</p>
                                    </div>
                                ) : null}
                                {/* PRICE */}
                                <div className='mb-4'>
                                    <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='price'>Price</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                        id='price'
                                        type='number'
                                        placeholder='Price Product'
                                        value={props.values.price}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {/* PRICE ERROR */}
                                {props.touched.price && props.errors.price ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.price}</p>
                                    </div>
                                ) : null}
                                {/* SUBMIT */}
                                <input 
                                type='submit'
                                className='bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4]'
                                value='Update Product'
                                />
                            </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        }
        </Layout>
    </div>
    )
}

export default EditProduct;