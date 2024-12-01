import React from "react";
import DashboardChart from "../components/DashboardChart";
import '../css/Dashboard.css'; // Importa o CSS personalizado
//import { Redirect } from 'react-router-dom';
//import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    //const { user } = useContext(AuthContext);

    // Verifique se o usuário tem permissão para acessar o Dashboard
    //if (!user || user.role === 'employee') {
        // Redireciona para o Home se o usuário não for permitido
    //    return <Redirect to="/" />;
    //}


  return (
    <div className="dashboard-container">
      <h1>Dashboard de Inventário</h1>
      <h2>Quantidade de Itens Cadastrados</h2>
      <DashboardChart />
    </div>
  );
};

export default Dashboard;
