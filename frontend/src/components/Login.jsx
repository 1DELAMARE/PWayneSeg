import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);  // Armazenando o token no localStorage
            /*setTimeout(() => {
                navigate('/inventory');  // Redirecionando após um pequeno delay
            }, 100); // Delay de 100ms*/
            window.location.href = '/inventory';
        } catch (error) {
            setMessage('Falha ao fazer login. Verifique suas credenciais!');
        }
    };

    return (
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Senha" 
                    required 
                    className="form-input"
                />
            </div>
            <button type="submit" className="btn">Entrar</button>
        </form>
        {message && <p className="message">{message}</p>}
    </div>
    );
};

export default Login;