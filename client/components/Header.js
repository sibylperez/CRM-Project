import React from "react";
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'

const USER_AUTENTICATE = gql`
query getUserAutenticate{
    getUserAutenticate{
      id
      name
      lastName
    }
  }
`;

const Header = () => {

    //Routing
    const router = useRouter()

    //APOLLO QUERY
    const { data, loading, error } = useQuery(USER_AUTENTICATE);

    //If loading is true, can't return info
    if(loading) return null;
    //User log out can't access 
    if(!data){
        return router.push('/login')
    }

    const { name, lastName } = data?.getUserAutenticate;


    //LOGOUT
    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0"><b>Hello {name.toUpperCase()} {lastName.toUpperCase()}</b></p>
            <button 
                onClick={() => logOut()}
                type="button"
                className="bg-[#5B57D4] w-full sm:w-auto font-bold uppercase text-xs rounded py-2 px-2 text-white shadow-md"
            >
                Log Out
            </button>
        </div>
    )
};

export default Header;