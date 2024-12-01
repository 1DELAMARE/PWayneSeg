import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext); // Acesse o usuário autenticado

  if (!user) {
    // Se não estiver autenticado, redireciona para o login
    return <Navigate to="/" />;
  }
  return element; // Caso esteja autenticado, renderiza o componente
};

export default PrivateRoute;