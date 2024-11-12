import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

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
  const [veiculos, setVeiculos] = useState([]); 
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 

  const toggleForm = () => setShowForm(!showForm);

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
      if (editIndex !== null) {
        const updatedVeiculos = [...veiculos];
        updatedVeiculos[editIndex] = formData;
        setVeiculos(updatedVeiculos);
        setEditIndex(null);
      } else {
        setVeiculos([...veiculos, formData]);
      }
      setFormData({
        placa: '',
        modelo: '',
        marca: '',
        anoFabricacao: '',
        cor: '',
        chassi: '',
        renavam: '',
        tipoCombustivel: '',
      });
      setShowForm(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(veiculos[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setVeiculos(veiculos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Veículos</h2>
      <Button onClick={toggleForm} variant="primary" className="mb-3">
        {showForm ? 'Voltar para Lista' : 'Novo Veículo'}
      </Button>

      {showForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              className={errors.placa ? 'is-invalid' : ''}
              name="placa"
              value={formData.placa}
              onChange={handleChange}
            />
            {errors.placa && <div className="invalid-feedback">{errors.placa}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              className={errors.modelo ? 'is-invalid' : ''}
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
            {errors.modelo && <div className="invalid-feedback">{errors.modelo}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              className={errors.marca ? 'is-invalid' : ''}
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            />
            {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ano de Fabricação</Form.Label>
            <Form.Control
              type="number"
              name="anoFabricacao"
              value={formData.anoFabricacao}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cor</Form.Label>
            <Form.Control
              type="text"
              name="cor"
              value={formData.cor}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Chassi</Form.Label>
            <Form.Control
              type="text"
              name="chassi"
              value={formData.chassi}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Renavam</Form.Label>
            <Form.Control
              type="text"
              name="renavam"
              value={formData.renavam}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Combustível</Form.Label>
            <Form.Select
              name="tipoCombustivel"
              value={formData.tipoCombustivel}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="gasolina">Gasolina</option>
              <option value="etanol">Etanol</option>
              <option value="diesel">Diesel</option>
              <option value="gnv">GNV</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="success">
            {editIndex !== null ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </Form>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo, index) => (
              <tr key={index}>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.marca}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(index)} className="me-2">
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CadastroVeiculo;
