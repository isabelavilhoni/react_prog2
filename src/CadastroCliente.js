import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

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
  const [clientes, setClientes] = useState([]);
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
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.cpf) tempErrors.cpf = "CPF é obrigatório";
    if (!formData.email) tempErrors.email = "Email é obrigatório";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editIndex !== null) {
        const updatedClientes = [...clientes];
        updatedClientes[editIndex] = formData;
        setClientes(updatedClientes);
        setEditIndex(null);
      } else {
        setClientes([...clientes, formData]);
      }
      setFormData({
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
      setShowForm(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(clientes[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setClientes(clientes.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Clientes</h2>
      <Button onClick={toggleForm} variant="primary" className="mb-3">
        {showForm ? 'Voltar para Lista' : 'Novo Cliente'}
      </Button>

      {showForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              className={errors.nome ? 'is-invalid' : ''}
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Select name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Select name="estadoCivil" value={formData.estadoCivil} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="solteiro">Solteiro</option>
              <option value="casado">Casado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              className={errors.cpf ? 'is-invalid' : ''}
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>RG</Form.Label>
            <Form.Control
              type="text"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Endereço Completo</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              className={errors.email ? 'is-invalid' : ''}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </Form.Group>

          <Button type="submit" variant="success">
            {editIndex !== null ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </Form>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
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

export default CadastroCliente;
