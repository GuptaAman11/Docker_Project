import React, { useState } from 'react'
import { useUploadFile } from '../hooks/fileHooks'

const UploadFile = () => {
  const {uploadFile} = useUploadFile()
    const [name , setName] = useState()
    const [file , setFile] = useState()
    const handleOnSubmit = (e) => {
        e.preventDefault() 
        uploadFile(name , file);
        
    }
  return (
    <div>
        <form action="" onSubmit={handleOnSubmit}>
            <span>Name :</span>
            <input type="text" 
            onChange={(e)=>setName(e.target.value)}/>
            <br />
            <span>File :</span>
            <input type="file" 
             id=""
             onChange={(e)=>setFile(e.target.files[0])}
              />
              <button type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default UploadFile