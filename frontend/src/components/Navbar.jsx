import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css'; // Certifique-se de importar o CSS do Navbar

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Usado para redirecionamento programático

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);  // Resetar o estado de usuário no contexto
        navigate('/'); // Redirecionar para a página inicial após logout
    };

    // Função para acessar o Dashboard com verificação de permissão
    const handleDashboardClick = () => {
        if (user.role === 'employee') {
            // Se o usuário for um employee, redireciona para home com uma mensagem
            alert('Você não tem permissão para acessar o Dashboard!');
            navigate('/'); // Redireciona para a página inicial (Home)
        } else {
            // Se o usuário for manager ou admin, redireciona para o Dashboard
            navigate('/dashboard');
        }
    };

    if (!user) {
        return null;  // Não exibe o Navbar se o usuário não estiver logado
    }

    return (
        <nav className="navbar-container">
            <ul>
                {user.role === 'employee' && (
                    <li><Link to="/inventory/equipment">Cadastro de Inventário de Equipamentos</Link></li>
                )}
                
                {user.role === 'manager' && (
                    <>
                        <li><Link to="/inventory/equipment">Cadastro de Inventário de Equipamentos</Link></li>
                        <li><Link to="/inventory/vehicles">Cadastro de Inventário de Veículos</Link></li>
                    </>
                )}

                {user.role === 'admin' && (
                    <>
                        <li><Link to="/inventory/equipment">Cadastro de Inventário de Equipamentos</Link></li>
                        <li><Link to="/inventory/vehicles">Cadastro de Inventário de Veículos</Link></li>
                        <li><Link to="/inventory/security">Cadastro de Inventário de Dispositivos de Segurança</Link></li>
                    </>
                )}

                <li><button onClick={handleLogout}>Sair</button></li>

                {/* Adicionando o botão de acesso ao Dashboard */}
                <li><button onClick={handleDashboardClick}>Ir para o Dashboard</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;