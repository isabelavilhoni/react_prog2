import React, { useState } from 'react';

const CadastroFornecedor = () => {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
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
    if (!formData.razaoSocial) tempErrors.razaoSocial = "Razão Social é obrigatória";
    if (!formData.cnpj) tempErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.email) tempErrors.email = "Email é obrigatório";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dados do fornecedor submetidos:", formData);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Fornecedores</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Razão Social</label>
          <input
            type="text"
            className={`form-control ${errors.razaoSocial ? 'is-invalid' : ''}`}
            name="razaoSocial"
            value={formData.razaoSocial}
            onChange={handleChange}
          />
          {errors.razaoSocial && <div className="invalid-feedback">{errors.razaoSocial}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Nome Fantasia</label>
          <input
            type="text"
            className="form-control"
            name="nomeFantasia"
            value={formData.nomeFantasia}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CNPJ</label>
          <input
            type="text"
            className={`form-control ${errors.cnpj ? 'is-invalid' : ''}`}
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />
          {errors.cnpj && <div className="invalid-feedback">{errors.cnpj}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Inscrição Estadual</label>
          <input
            type="text"
            className="form-control"
            name="inscricaoEstadual"
            value={formData.inscricaoEstadual}
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

export default CadastroFornecedor;
