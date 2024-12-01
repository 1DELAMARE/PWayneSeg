import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Inventory.css';

const Inventory = () => {
    const { user } = useContext(AuthContext);
    const { type } = useParams(); // Tipo de inventário (equipamentos, veículos, etc.)
    // Lógica de renderização condicional de acordo com o tipo de inventário
    //('employee', 'manager', 'admin')
    if (type === 'equipment' && (user.role === 'employee' || user.role === 'manager' || user.role === 'admin')) {
        return <h2>Cadastro de Inventário de Equipamentos</h2>;
    }

    if (type === 'vehicles' && (user.role === 'manager' || user.role === 'admin')) {
        return <h2>Cadastro de Inventário de Veículos</h2>;
    }

    if (type === 'security' && user.role === 'admin') {
        return <h2>Cadastro de Inventário de Dispositivos de Segurança</h2>;
    }
    
    //return <p className="no-access-message">Acesso não permitido! Você não tem permissão para acessar esta página.</p>;
    //return <h2>Acesso não permitido! Você não tem permissão para acessar esta página.</h2>;
};

export default Inventory;