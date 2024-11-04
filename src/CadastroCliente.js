import React, { useState } from 'react';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    sexo: '',
    estadoCivil: '',
    cpf: '',
    rg: '',
    endereco: '',
    telefone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.cpf) tempErrors.cpf = "CPF é obrigatório";
    if (!formData.email) tempErrors.email = "Email é obrigatório";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dados submetidos:", formData);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome Completo</label>
          <input
            type="text"
            className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sexo</label>
          <select
            className="form-select"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Estado Civil</label>
          <select
            className="form-select"
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
          {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">RG</label>
          <input
            type="text"
            className="form-control"
            name="rg"
            value={formData.rg}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Endereço Completo</label>
          <input
            type="text"
            className="form-control"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCliente;
