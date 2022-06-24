import React from "react";
import { useRouter } from "next/router";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from "sweetalert2";
import Layout from "../../components/Layout";

const GET_CLIENT_BY_ID = gql`
query getClientById($id: ID!){
    getClientById(id: $id) {
      name
      lastName
      company
      email
      phone
    }
  }
`;

const UPDATE_CLIENT = gql`
mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input){
      name
      lastName
      company
      email
      phone
    }
  }
`

const EditClient = () => {
    //Get ID
    const router = useRouter();
    const { query: {id} } = router;

    //QUERY
    const { data, loading, error } = useQuery(GET_CLIENT_BY_ID, {
        variables:{
            id
        }
    });

    //MUTATION
    const [ updateClient ] = useMutation(UPDATE_CLIENT)

    //Schema Validation
    const schemaValidation = yup.object({
        name: yup.string().min(2, 'Name must be at least 2 characters').required("Name is a required field"),
        lastName: yup.string().min(3, 'Lastname must be at least 3 characters').required("Lastname is a required field"),
        company: yup.string().min(4, 'Lastname must be at least 4 characters').required("Company is a required field"),
        email: yup.string().email('The email must be a valid email').required("Email is a required field"),
    })

    if (loading) return 'Loading...';

    const { getClientById } = data;
    //console.log(getClientById)

    //FUNCTION UPDATE
    const updateInfoClient = async values => {
        const { name, lastName, company, email, phone } = values
        try {
            const { data } = await updateClient({
                variables: {
                    id,
                    input : {
                        name,
                        lastName,
                        company,
                        email,
                        phone
                    }
                }
            });
            Swal.fire({
                title: 'Edit Sucess', 
                text: `Client ${data.updateClient.name} ${data.updateClient.lastName} was successfully edited`, 
                icon: 'success', 
                timer: 2000
             });
             setTimeout(() => {
                 router.push('/')
            }, 2500)
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    return(
        <div>
        <Layout>
            <div className="flex justify-center">
                <h1 className='text-[#5B57D4] text-3xl font-medium'>Edit Client</h1>
            </div>
        { loading ? 
                <Loading />
            : 
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={ schemaValidation }
                        enableReinitialize
                        initialValues={ getClientById }
                        onSubmit = { (values) => {
                            updateInfoClient(values)
                        }}
                    >
                        { props => {
                            return(
                        <form
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={props.handleSubmit}>
                            {/* NAME */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='name'>Name</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='name'
                                    type='text'
                                    placeholder='Client Name'
                                    value={props.values.name}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} 
                                    />
                            </div>
                            {/* NAME ERROR */}
                            {props.touched.name && props.errors.name ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.name }</p>
                                </div>
                            ) : null}
                            
                            {/* LASTNAME */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Lastname</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='lastName'
                                    type='text'
                                    placeholder='Client Lastname'
                                    value={props.values.lastName}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                            </div>
                            {/* LASTNAME ERROR */}
                            {props.touched.lastName && props.errors.lastName ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.lastName }</p>
                                </div>
                            ) : null}                            
                            {/* COMPANY */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Company</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='company'
                                    type='text'
                                    placeholder='Client Company'
                                    value={props.values.company}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                            </div>
                            {/* COMPANY ERROR */}
                            {props.touched.company && props.errors.company ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.company }</p>
                                </div>
                            ) : null}
                            {/* EMAIL */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Email</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='email'
                                    type='email'
                                    placeholder='Client Email'
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                            </div>
                            {/* EMAIL ERROR */}
                            {props.touched.email && props.errors.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.email }</p>
                                </div>
                            ) : null}
                            {/* PHONE */}
                            <div className='mb-4'>
                                <label className='block text-[#1c1c3c] text-sm font-bold mb-2' htmlFor='lastName'>Phone</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-offset-0'
                                    id='phone'
                                    type='tel'
                                    placeholder='Client Phone'
                                    value={props.values.phone}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                            </div>
                            {/* SUBMIT */}
                            <input 
                            type='submit'
                            className='bg-[#1c1c3c] w-full mt-5 p-2 text-white uppercase hover:bg-[#5B57D4]'
                            value='Update Client'
                            />
                        </form>
                        )}
                    }
                    </Formik>
                </div>
            </div>
        }
        </Layout>
    </div>
    )
};

export default EditClient;