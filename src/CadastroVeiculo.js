import React, { useState } from 'react';

const CadastroVeiculo = () => {
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    anoFabricacao: '',
    cor: '',
    chassi: '',
    renavam: '',
    tipoCombustivel: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.placa) tempErrors.placa = "Placa é obrigatória";
    if (!formData.modelo) tempErrors.modelo = "Modelo é obrigatório";
    if (!formData.marca) tempErrors.marca = "Marca é obrigatória";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dados do veículo submetidos:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Placa</label>
        <input type="text" className="form-control" name="placa" value={formData.placa} onChange={handleChange} />
        {errors.placa && <div className="text-danger">{errors.placa}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Modelo</label>
        <input type="text" className="form-control" name="modelo" value={formData.modelo} onChange={handleChange} />
        {errors.modelo && <div className="text-danger">{errors.modelo}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Marca</label>
        <input type="text" className="form-control" name="marca" value={formData.marca} onChange={handleChange} />
        {errors.marca && <div className="text-danger">{errors.marca}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ano de Fabricação</label>
        <input type="number" className="form-control" name="anoFabricacao" value={formData.anoFabricacao} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Cor</label>
        <input type="text" className="form-control" name="cor" value={formData.cor} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Chassi</label>
        <input type="text" className="form-control" name="chassi" value={formData.chassi} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Renavam</label>
        <input type="text" className="form-control" name="renavam" value={formData.renavam} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Combustível</label>
        <select className="form-select" name="tipoCombustivel" value={formData.tipoCombustivel} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="gasolina">Gasolina</option>
          <option value="etanol">Etanol</option>
          <option value="diesel">Diesel</option>
          <option value="gnv">GNV</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Cadastrar</button>
    </form>
  );
};

export default CadastroVeiculo;