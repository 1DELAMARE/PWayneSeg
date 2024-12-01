import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/VehiclesList.css'; // Certifique-se de usar o estilo correto

// Componente para exibir e gerenciar os veículos
function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [editingId, setEditingId] = useState(null);

  // Função para carregar os veículos da API (GET)
  const loadVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }
      // Envia o token no cabeçalho Authorization
      const response = await axios.get('http://localhost:5000/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setVehicles(response.data); // Atualiza a lista de veículos
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  // Função para adicionar ou editar um veículo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    // Adicionar ou editar veículo
    try {
      if (editingId) {
        // Atualizar veículo
        await axios.put(`http://localhost:5000/api/vehicles/${editingId}`, {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setEditingId(null);  // Limpar edição
        loadVehicles(); // Recarregar a lista de veículos
      } else {
        // Criar novo veículo
        await axios.post('http://localhost:5000/api/vehicles', {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        loadVehicles(); // Recarregar a lista de veículos
      }

      // Limpar os campos do formulário após submissão
      setName('');
      setDescription('');
      setQuantity(0);
    } catch (error) {
      console.error("Erro ao adicionar ou editar veículo:", error);
    }
  };

  // Editar um veículo
  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setName(vehicle.name);
    setDescription(vehicle.description);
    setQuantity(vehicle.quantity);
  };

  // Deletar um veículo
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      loadVehicles(); // Recarregar a lista de veículos
    } catch (error) {
      console.error("Erro ao deletar veículo:", error);
    }
  };

  return (
    <div className="vehicles-container">
      <h1>Inventário de Veículos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'} Veículo</button>
      </form>

      <h2>Veículos</h2>
      <ul className="vehicles-list">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <strong>{vehicle.name}</strong> - {vehicle.quantity} unidades
            <p>{vehicle.description}</p>
            <div><button onClick={() => handleEdit(vehicle)}>Editar</button></div>
            <button onClick={() => handleDelete(vehicle.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehiclesList;