import React, { useEffect } from 'react';
import { useGetFile } from '../hooks/fileHooks';
import './getfile.css'
import { useParams } from 'react-router-dom';
const GetFile = () => {
    const {id} = useParams()
    const { abcFile, error, getFile } = useGetFile();

    useEffect(() => {
        getFile(id);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {abcFile.length > 0 ? (
                <div className='z-box'>
                    {abcFile.map((file, index) => (
                        <div className='z-image' key={index}>
                            <img src={file.imgUrl} alt=""  />
                            <span className='z-span'>{file.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No files found.</p>
            )}
        </div>
    );
};

export default GetFile;
