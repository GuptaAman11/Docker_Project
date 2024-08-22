import React, { useState } from 'react';
import './Login.css'
import { useRegister } from '../hooks/user';
const Signup = ({ onSignup }) => {
    const {register} = useRegister()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        register(name , email ,password ) ;
    };

    return (
        <div className="a-main">
        <form onSubmit={handleSignup} className='a-form'>
            <h2>Signup</h2>
            <input
                className='a-input'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className='a-input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className='a-button' type="submit">Signup</button>
        </form>
        </div>
    );
};

export default Signup;
