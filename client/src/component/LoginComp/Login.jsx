import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/user';
const Login = ({ onLogin }) => {
    const navigate = useNavigate()
    const {login} = useLogin() ;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        login(email , password) ;
        navigate('/')

        
    };

    return (
        <div className="a-main">
        <form onSubmit={handleLogin} className='a-form'>
            <h2>Login</h2>
            <input
                className='a-input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className='a-input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className='a-button' type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
