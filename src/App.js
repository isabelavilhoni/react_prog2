import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import Login from './Login';
import CadastroCliente from './CadastroCliente';
import CadastroFornecedor from './CadastroFornecedor';
import CadastroFuncionario from './CadastroFuncionario';
import CadastroVeiculo from './CadastroVeiculo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Menu user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/cadastro" element={<CadastroCliente />} />
            <Route path="/cadastro-fornecedor" element={<CadastroFornecedor />} />
            <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
            <Route path="/cadastro-veiculo" element={<CadastroVeiculo />} />
            <Route path="*" element={<Navigate to="/cadastro" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
