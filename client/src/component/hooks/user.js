import { useState } from "react";

export function useRegister () {
    const register = async(name ,email , password) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/register' ,{
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json',
                } ,
                body : JSON.stringify({
                    name : name ,
                    email : email ,
                    password : password
                }) 
    
            })
            const responseData = await response.json() ;
        } catch (error) {
            console.log(error) ;
        }
    }
    return {register} ;
}

export function useLogin() {
    const login = async(email , password) => {
        const response = await fetch('http://localhost:8080/api/v1/users/login' ,{
            method : 'POST' ,
            headers : {
                'Content-Type' : 'application/json',
            } ,
            body : JSON.stringify({
                email : email ,
                password : password 
            })
        })

        const responseData = await response.json() ;
        if(responseData){
            localStorage.setItem('token',responseData.token) ;
        }
    }
    return {login}
}

export function useGetAllUser() {
    const [allUser , setAllUser] = useState([])
    const getAllUser = async() => {
        try {
            const authToken = localStorage.getItem('token') ;
            const response = await fetch('http://localhost:8080/api/v1/users/alluser' , {
                method : 'GET' ,
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
    
            })
            const responseData = await response.json() ;
            setAllUser(responseData) ;

            
        } catch (error) {
            console.log(error)
        }


    }
    return {
        allUser , 
        getAllUser
    }
}

export function useGetLoggUser() {
    const [loggedUser , setLoggedUser] = useState() ;
    const getLoggUser = async() => {
        try {
            const authToken = localStorage.getItem('token') ;
            const response = await fetch('http://localhost:8080/api/v1/users/loggeduser' , {
                method : 'GET' ,
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
    
            })
            const responseData = await response.json() ;
            setLoggedUser(responseData) ;
        } catch (error) {
            
        }
    }
    return {loggedUser  , getLoggUser}
}