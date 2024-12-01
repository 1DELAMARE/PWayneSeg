CREATE DATABASE wayne_security;

USE wayne_security;

-- Tabela de usu�rios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('employee', 'manager', 'admin') DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de invent�rio de equipamentos (acesso: administradores, gerentes, funcionarios)
CREATE TABLE equipment_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL
);

-- Tabela de invent�rio de ve�culos (acesso: administradores, gerentes)
CREATE TABLE vehicle_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL
);

-- Tabela de invent�rio de dispositivos de seguran�a (acesso: administradores)
CREATE TABLE security_device_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL
);