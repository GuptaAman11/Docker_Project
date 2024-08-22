import { useState } from "react";

export function useGetFile() {
    const [abcFile, setAbcFile] = useState([]);
    const [error, setError] = useState(null);

    const getFile = async (id) => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/v1/upload/getcloud/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            setAbcFile(responseData);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return { abcFile, error, getFile };
}

export function useUploadFile() {
    const uploadFile = async (name , file) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('picture', file);
            const authToken = localStorage.getItem('token')
            const response = await fetch('http://localhost:8080/api/v1/upload/cloud' ,{
                method : 'POST' ,
                headers : {
                    Authorization: `Bearer ${authToken}`,

                } ,
                body : formData
    
            })
            const responseData = response.data;
            if (response.status === 200) {
              console.log(responseData);
              
            } else {
              console.log('Failed to create post');
            }        } catch (error) {
            console.log(error) ;
        }
    }
    return {
        uploadFile
    }
}

