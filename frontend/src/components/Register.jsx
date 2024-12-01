import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Importando o Link do React Router
import '../css/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
            localStorage.setItem('token', response.data.token); // Armazenando o token JWT
            setMessage('Usuário cadastrado com sucesso! Token gerado.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <div className="register-container">
            <h2>Cadastro de Usuário</h2>
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
                <div className="form-group">
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                        <option value="employee">Funcionário</option>
                        <option value="manager">Gerente</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="btn">Cadastrar</button>
            </form>
            {message && (
                <p className="message">
                    {message} <strong><Link to="/login"> - Faça o Login aqui: </Link></strong>
                </p>
            )}
        </div>
    );
};

export default Register;