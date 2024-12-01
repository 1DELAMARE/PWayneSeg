const express = require('express');
// Conexão com o banco de dados MySQL
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota para cadastro de usuário
app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;

  // Verificar se o email já está cadastrado
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no banco de dados' });
    if (results.length > 0) return res.status(400).json({ message: 'Email já cadastrado' });

    // Hash da senha antes de salvar no banco
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erro ao criar senha' });

      // Inserir novo usuário no banco
      db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [email, hashedPassword, role || 'employee'], (err, results) => {
          if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário' });

          // Gerar o token JWT
          const token = jwt.sign({ id: results.insertId, email, role: role || 'employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });

          // Retornar o token
          res.status(201).json({ message: 'Usuário cadastrado com sucesso', token });
        });
    });
  });
});

// Rota para login (para gerar o token após cadastro)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no banco de dados' });
    if (results.length === 0) return res.status(401).json({ message: 'Email ou senha inválidos' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erro ao comparar senha' });
      if (!isMatch) return res.status(401).json({ message: 'Email ou senha inválidos' });

      // Gerar token JWT
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Retornar o token
      res.json({ message: 'Login bem-sucedido', token });
    });
  });
});

// Middleware para proteger rotas
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

// Rota para obter todos os equipamentos
//http://localhost:5000/api/equipment
app.get('/api/equipment', authenticate, async (req, res) => {
  db.query('SELECT * FROM equipment_inventory', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar equipamentos' });
    res.status(200).json(results);
  });
});

// Rota para adicionar um novo equipamento
app.post('/api/equipment', authenticate, async (req, res) => {
  const { name, description, quantity } = req.body;
  db.query('INSERT INTO equipment_inventory (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao adicionar equipamento' });
    res.status(201).json({ message: 'Equipamento criado com sucesso' });
  });
});

// Rota para atualizar um equipamento
app.put('/api/equipment/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  db.query('UPDATE equipment_inventory SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao atualizar equipamento' });
    res.status(200).json({ message: 'Equipamento atualizado com sucesso' });
  });
});

// Rota para deletar um equipamento
app.delete('/api/equipment/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM equipment_inventory WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao deletar equipamento' });
    res.status(200).json({ message: 'Equipamento deletado com sucesso' });
  });
});

// Rota para obter todos os veiculos
//http://localhost:5000/api/vehicles
app.get('/api/vehicles', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });
  db.query('SELECT * FROM vehicle_inventory', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar Veiculo' });
    res.status(200).json(results);
  });
});

// Rota para adicionar um novo veiculos
app.post('/api/vehicles', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });
  const { name, description, quantity } = req.body;
  if (!name || !description || quantity === undefined) {
    return res.status(400).json({ message: 'Dados faltando (name, description ou quantity)' });
  }
  db.query('INSERT INTO vehicle_inventory (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao adicionar veiculo' });
    res.status(201).json({ message: 'Veiculo criado com sucesso' });
  });
});

// Rota para atualizar um veiculos
app.put('/api/vehicles/:id', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  db.query('UPDATE vehicle_inventory SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao atualizar veiculo' });
    res.status(200).json({ message: 'Veiculo atualizado com sucesso' });
  });
});

// Rota para deletar um veiculos
app.delete('/api/vehicles/:id', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });
  const { id } = req.params;
  db.query('DELETE FROM vehicle_inventory WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao deletar veiculo' });
    res.status(200).json({ message: 'Veiculo deletado com sucesso' });
  });
});

// Rotas device Segurança 
app.get('/api/security-devices', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });

  db.query('SELECT * FROM security_device_inventory', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar dispositivos de segurança' });
    res.status(200).json(results);
  });
});

app.post('/api/security-devices', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });

  const { name, description, quantity } = req.body;
  // Validação de campos obrigatórios
  if (!name || !description || quantity === undefined) {
    return res.status(400).json({ message: 'Dados faltando (name, description ou quantity)' });
  }

  db.query('INSERT INTO security_device_inventory (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao adicionar dispositivo de segurança' });
    res.status(201).json({ message: 'Dispositivo de segurança criado com sucesso' });
  });
});

app.put('/api/security-devices/:id', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });

  const { id } = req.params;
  const { name, description, quantity } = req.body;

  db.query('UPDATE security_device_inventory SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao atualizar dispositivo de segurança' });
    res.status(200).json({ message: 'Dispositivo de segurança atualizado com sucesso' });
  });
});

app.delete('/api/security-devices/:id', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });

  const { id } = req.params;

  db.query('DELETE FROM security_device_inventory WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao deletar dispositivo de segurança' });
    res.status(200).json({ message: 'Dispositivo de segurança deletado com sucesso' });
  });
});

app.get('/api/dashboard', authenticate, async (req, res) => {
  if (req.user.role === 'employee') return res.status(403).json({ message: 'Acesso proibido' });

  try {
    // Contagem de itens de cada inventário
    const [equipmentCount] = await db.promise().query('SELECT COUNT(*) AS count FROM equipment_inventory');
    const [vehicleCount] = await db.promise().query('SELECT COUNT(*) AS count FROM vehicle_inventory');
    const [securityDeviceCount] = await db.promise().query('SELECT COUNT(*) AS count FROM security_device_inventory');

    res.status(200).json({
      equipment: equipmentCount[0].count,
      vehicle: vehicleCount[0].count,
      securityDevice: securityDeviceCount[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar contagem de itens' });
  }
});

/* Rota de gestão de recursos (somente para administradores)
app.get('/api/resources', authenticate, authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acesso proibido' });

  db.query('SELECT * FROM resources', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no banco de dados' });
    res.json(results);
  });
});

// Rota de adicionar um recurso (somente para administradores)
app.post('/api/resources', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acesso proibido' });

  const { name, type, description } = req.body;
  db.query('INSERT INTO resources (name, type, description) VALUES (?, ?, ?)', [name, type, description], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao adicionar recurso' });
    res.status(201).json({ message: 'Recurso criado com sucesso' });
  });
});*/

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});