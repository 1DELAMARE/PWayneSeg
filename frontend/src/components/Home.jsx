import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Sistema de Gestão de Segurança</h1>
            <p>Faça login para acessar os recursos ou cadastre-se caso não tenha uma conta.</p>
            <div className="home-buttons">
                <Link to="/login" className="btn">Entrar</Link>
                <Link to="/register" className="btn btn-secondary">Cadastrar</Link>
            </div>
        </div>
    );
};

export default Home;