import React from 'react';
import CadastroCliente from './CadastroCliente';
import CadastroFornecedor from './CadastroFornecedor';
import CadastroFuncionario from './CadastroFuncionario';
import CadastroVeiculo from './CadastroVeiculo';

const App = () => {
  return (
    <div className="container mt-5">
      <h1>Cadastro de Clientes</h1>
      <CadastroCliente />

      <hr />
      <h1>Cadastro de Fornecedores</h1>
      <CadastroFornecedor />

      <hr />
      <h1>Cadastro de Funcionários</h1>
      <CadastroFuncionario />

      <hr />
      <h1>Cadastro de Veículos</h1>
      <CadastroVeiculo />
    </div>
  );
};

export default App;
