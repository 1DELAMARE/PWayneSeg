import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SecurityList.css';

// Componente para exibir e gerenciar os Disp.Segurança
function SecurityList() {
  const [security, setSecurity] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [editingId, setEditingId] = useState(null);

  // Carregar os Disp.Segurança da API
  const loadSecurity = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/security-devices', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Passando o token no cabeçalho
        }
      });
      setSecurity(response.data);
    } catch (error) {
      console.error("Erro ao carregar Disp.Segurança:", error);
    }
  };

  useEffect(() => {
    loadSecurity();
  }, []);

  // Adicionar ou editar um dispositivo de Segurança
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    if (editingId) {
      // Atualizar Dispositivos de Segurança
      try {
        await axios.put(`http://localhost:5000/api/security-devices/${editingId}`, {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setEditingId(null);  // Limpar edição
        loadSecurity(); // Recarregar a lista
      } catch (error) {
        console.error("Erro ao atualizar Disp.Segurança:", error);
      }
    } else {
      // Criar novo dispositivo de segurança
      try {
        await axios.post('http://localhost:5000/api/security-devices', {
          name, description, quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        loadSecurity(); // Recarregar a lista
      } catch (error) {
        console.error("Erro ao adicionar Dispositivo de Segurança:", error);
      }
    }

    setName('');
    setDescription('');
    setQuantity(0);
  };

  // Editar um dispositivo de segurança
  const handleEdit = (security) => {
    setEditingId(security.id);
    setName(security.name);
    setDescription(security.description);
    setQuantity(security.quantity);
  };

  // Deletar um dispositivo de segurança
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/security-devices/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      loadSecurity(); // Recarregar a lista
    } catch (error) {
      console.error("Erro ao deletar dispositivo de segurança:", error);
    }
  };

  return (
    <div className="security-container">
      <h1>Inventário de Dispositivos de Segurança</h1>
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
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'} Dispositivo de Segurança</button>
      </form>

      <h2>Dispositivos de Segurança</h2>
      <ul className="security-list">
        {security.map((security) => (
          <li key={security.id}>
            <strong>{security.name}</strong> - {security.quantity} unidades
            <p>{security.description}</p>
            <div><button onClick={() => handleEdit(security)}>Editar</button></div>
            <button onClick={() => handleDelete(security.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SecurityList;
