import React, { useEffect } from 'react'
import { useGetAllUser, useGetLoggUser } from '../hooks/user'
import { Link } from 'react-router-dom';

const AllUserPage = () => {
    const {loggedUser , getLoggUser} = useGetLoggUser()
    const {allUser , getAllUser}= useGetAllUser() ;

    useEffect(() => {
      getAllUser() ;
      getLoggUser()
    }, [])

    
  return (
    <div className='z-main'>
            {allUser.length > 0 && allUser ? (
                <div className='z-box'>
                    { loggedUser ?
                        (<Link to={`/get/${loggedUser._id}`}>
                        <div className="z-abc">get your images</div>

                    </Link>) : (<h1>hello world</h1>)
                    }
                    {allUser.map((user, index) => (
                        <Link to={`/get/${user._id}`}>
                            <div className='z-abc' key={index}>{user.name}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p> No User found. </p>
            )}
        </div>
    )
}

export default AllUserPage