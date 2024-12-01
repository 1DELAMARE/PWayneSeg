# Sistema de Gerenciamento de Segurança - Indústrias Wayne

## Introdução

O **Sistema de Gerenciamento de Segurança** é uma aplicação desenvolvida para gerenciar o acesso e o controle de recursos das **Indústrias Wayne**. O sistema proporciona autenticação e autorização de usuários, além de funcionalidades para gerenciar inventários de equipamentos, veículos e dispositivos de segurança. O backend é construído utilizando **Node.js** com **Express**, **MySQL** para armazenamento de dados e **JWT** para autenticação, enquanto o frontend é desenvolvido com **React.js**, proporcionando uma interface web responsiva.

---

## Arquitetura do Sistema

### Backend
- **Node.js + Express**: Responsável pela criação de rotas RESTful para autenticação, controle de recursos e acesso às áreas restritas.
- **MySQL**: Banco de dados relacional para armazenar informações de usuários e recursos (equipamentos, veículos, dispositivos de segurança).
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização dos usuários.
- **Bibliotecas**:
  - **bcryptjs**: Para criptografar senhas.
  - **cors**: Para permitir requisições cross-origin.
  - **dotenv**: Para armazenar variáveis de ambiente, como o segredo do JWT.

### Frontend
- **React.js**: Framework utilizado para construir a interface do usuário, que é interativa e responsiva.
- **HTML, CSS e JavaScript**: Tecnologias utilizadas para a construção das páginas da interface.
- **Roteamento**: Utiliza **react-router-dom** para navegação e **PrivateRoute** para proteger rotas que exigem autenticação.

---

## Funcionalidades Principais

### Autenticação e Autorização:
- **Registro de usuários** e **login** com geração de token JWT.
- Tipos de usuários com diferentes níveis de acesso:
  - **Funcionario**: Acesso apenas aos recursos de equipamentos.
  - **Gerente**: Acesso aos recursos de equipamentos e veículos.
  - **Administrador**: Acesso completo aos recursos de equipamentos, veículos e dispositivos de segurança.

### Gestão de Inventário de Recursos:
- **Gestão de Inventário**: Administradores e gerentes podem gerenciar os seguintes recursos:
  - **Equipamentos**: Adicionar, atualizar e deletar itens no inventário.
  - **Veículos**: Adicionar, atualizar e deletar itens no inventário.
  - **Dispositivos de segurança**: Adicionar, atualizar e deletar itens no inventário.

### Dashboard:
- Exibe a quantidade de itens nos inventários de equipamentos, veículos e dispositivos de segurança.
- Acesso restrito a gerentes e administradores.

---

## Instalação e Execução

### Backend
#### Pré-requisitos:
- **Node.js** (versão recomendada: v18 ou superior)
- **MySQL**
- Editor de código (Visual Studio Code ou similar)

#### Passos para Instalação:

0. Clone o repositório do backend:
    ```bash
    git clone https://github.com/1DELAMARE/PWayneSeg.git
    ```
1. Execução do repositório do backend:
    ```bash
    cd backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados:
    - Crie o banco de dados `wayne_security` no MySQL.
    - Execute o script SQL para criar as tabelas necessárias (disponível no arquivo `wayne_security.sql`).

4. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável:
    ```env
    JWT_SECRET=seu-segredo-de-token
    ```

5. Execute o servidor:
    ```bash
    npm start
    ```
    O servidor estará disponível em `http://localhost:5000`.

### Frontend
#### Pré-requisitos:
- **Node.js** (versão recomendada: v18 ou superior)

#### Passos para Instalação:

1. Execução do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O frontend será servido em `http://localhost:3000`. ou na Porta de sua preferencia.

---

## Utilização do Sistema

### Cadastro de Usuários

1. **Página de Cadastro**: 
   Acesse a página `/register`, forneça um e-mail, senha e o tipo de usuário (employee, manager ou admin).
   Após o cadastro, um token JWT será gerado e enviado ao usuário.

2. **Login**: 
   Acesse a página `/login`, insira o e-mail e a senha cadastrados. Após o login, o token JWT será armazenado no armazenamento local do navegador.

### Funcionalidades para Administradores e Gerentes

- **Dashboard**: 
  Exibe a quantidade de itens nos inventários. Acesso restrito a **gerentes** e **administradores**.
  
- **Gestão de Inventários**:
  - **Equipamentos**: Funcionários, gerentes e administradores podem visualizar e atualizar o inventário de equipamentos.
  - **Veículos**: Apenas gerentes e administradores têm permissão para visualizar e atualizar o inventário de veículos.
  - **Dispositivos de Segurança**: Apenas administradores podem visualizar e atualizar o inventário de dispositivos de segurança.

- **Roteamento Protegido**:
  Acesso controlado com base no tipo de usuário. Usuários não autorizados são redirecionados ou recebem uma mensagem de erro.

### Logout
O usuário pode sair do sistema clicando no botão "Sair" na barra de navegação. Isso remove o token JWT e redireciona o usuário para a página inicial.

---

## Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas principais para gerenciar os recursos:

- **users**: Armazena informações de usuários, incluindo e-mail, senha (criptografada) e tipo de usuário (employee, manager, admin).
- **equipment_inventory**: Armazena informações sobre os equipamentos, como nome, descrição e quantidade.
- **vehicle_inventory**: Armazena informações sobre os veículos, como nome, descrição e quantidade.
- **security_device_inventory**: Armazena informações sobre os dispositivos de segurança, como nome, descrição e quantidade.

---

## Conclusão

O **Sistema de Gerenciamento de Segurança** oferece uma solução robusta e segura para controlar o acesso e a gestão de recursos dentro das instalações das Indústrias Wayne. Com uma arquitetura bem definida, integração eficaz entre o frontend e o backend, e controles rigorosos de autenticação e autorização, o sistema garante eficiência e segurança nas operações.

---

## Observações Finais

- Certifique-se de que as variáveis de ambiente e o banco de dados estão corretamente configurados antes de rodar o sistema.
- A interface frontend é responsiva e foi projetada para ser intuitiva e fácil de usar, com rotas protegidas para garantir que apenas usuários autorizados possam acessar determinadas funcionalidades.

---

Para mais informações ou dúvidas, consulte a documentação adicional ou entre em contato com a equipe de desenvolvimento.
