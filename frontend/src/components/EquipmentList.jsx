import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EquipmentList.css';

// Componente para exibir e gerenciar os equipamentos
function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [editingId, setEditingId] = useState(null);

  // Função para carregar os equipamentos da API (GET)
  const loadEquipments = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }

      // Envia o token no cabeçalho Authorization
      const response = await axios.get('http://localhost:5000/api/equipment', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setEquipments(response.data); 
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error);
    }
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  // Função para adicionar ou editar um equipamento
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    // Adicionar ou editar equipamento
    try {
      if (editingId) {
        // Atualizar equipamento
        await axios.put(`http://localhost:5000/api/equipment/${editingId}`, {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setEditingId(null);  // Limpar edição
        loadEquipments(); // Recarregar a lista
      } else {
        // Criar novo equipamento
        await axios.post('http://localhost:5000/api/equipment', {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        loadEquipments(); // Recarregar a lista
      }

      // Limpar os campos do formulário após submissão
      setName('');
      setDescription('');
      setQuantity(0);
    } catch (error) {
      console.error("Erro ao adicionar ou editar equipamento:", error);
    }
  };

  // Editar um equipamento
  const handleEdit = (equipment) => {
    setEditingId(equipment.id);
    setName(equipment.name);
    setDescription(equipment.description);
    setQuantity(equipment.quantity);
  };

  // Deletar um equipamento
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/equipment/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      loadEquipments(); // Recarregar a lista
    } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
    }
  };

  return (
    <div className="equipment-container">
      <h1>Inventário de Equipamentos</h1>
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
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'} Equipamento</button>
      </form>

      <h2>Equipamentos</h2>
      <ul className="equipment-list">
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            <strong>{equipment.name}</strong> - {equipment.quantity} unidades
            <p>{equipment.description}</p>
            <div><button className="btEdit" onClick={() => handleEdit(equipment)}>Editar</button></div>
            <button onClick={() => handleDelete(equipment.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipmentList;