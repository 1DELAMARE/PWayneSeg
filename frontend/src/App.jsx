import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Provider de autenticação
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register'; // Corrigi a falta do Register
import PrivateRoute from './components/PrivateRoute'; // Rota privada
import Inventory from './components/Inventory';
import EquipmentList from './components/EquipmentList';
import VehiclesList from './components/VehiclesList';
import SecurityList from './components/SecurityList';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <AuthProvider> {/* Colocamos o AuthProvider fora para garantir que todas as rotas tenham acesso ao contexto */}
      <Router>
        <Navbar />
        <Routes>
          {/* Rota de acesso livre */}
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/inventory"
            element={<PrivateRoute element={<Inventory />} />}
          />
          <Route
            path="/inventory/vehicles"
            element={<PrivateRoute element={<VehiclesList />} />}
          />
          <Route
            path="/inventory/equipment"
            element={<PrivateRoute element={<EquipmentList />} />}
          />
          <Route
            path="/inventory/security"
            element={<PrivateRoute element={<SecurityList />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;