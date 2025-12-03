import axios from 'axios';
import React, { useEffect } from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL:'http://localhost:5000/',
    withCredentials: true
})

const useAxiosSecure = () => {

    const {logoutUser} = useAuthContext()

    useEffect(()=>{
        axiosInstance.interceptors.response.use((response) => {
            return response
        }, (error=>{

            console.log("inside the interceptor error", error)
            
            if(error.status === 401 || error.status === 403){
                logoutUser()
                .then(()=>{
                    console.log('logout user')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            return Promise.reject(error)
        }))
    },[logoutUser])
    return axiosInstance
};

export default useAxiosSecure;