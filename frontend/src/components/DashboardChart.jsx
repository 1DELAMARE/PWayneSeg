import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from 'axios';
import '../css/Dashboard.css'; // Certifique-se de que o CSS esteja importado

// Registre os componentes necessários para o Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const [data, setData] = useState(null);

  // Carregar os dados da contagem dos itens
  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.error('Token de autenticação não encontrado');
                return;
            }
            const response = await axios.get('http://localhost:5000/api/dashboard', {
                headers: {
                'Authorization': `Bearer ${token}`,
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Erro ao carregar os dados do dashboard:", error);
        }
    };
    fetchData();
  }, []);

  // Configuração do gráfico, que será baseada nos dados recebidos
  const chartData = {
    labels: ["Equipamentos", "Veículos", "Dispositivos de Segurança"], // Labels para as barras
    datasets: [
      {
        label: "Quantidade de Itens",
        data: [data?.equipment || 0, data?.vehicle || 0, data?.securityDevice || 0], // Dados para cada barra
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Cor do fundo das barras
        borderColor: "rgba(75, 192, 192, 1)", // Cor da borda das barras
        borderWidth: 1, // Largura da borda
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Dashboard de Inventário",
      },
    },
  };

  return (
    <div className="dashboard-chart-container">
      {data ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="loader">
          <p>Carregando...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardChart;