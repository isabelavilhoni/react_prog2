import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const CadastroFuncionario = () => {
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
  const [funcionarios, setFuncionarios] = useState([]);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const API_URL = 'http://localhost:5000/funcionarios';

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(API_URL);
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!formData.cpf) tempErrors.cpf = 'CPF é obrigatório';
    if (!formData.email) tempErrors.email = 'Email é obrigatório';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (editIndex !== null) {
          await axios.put(`${API_URL}/${funcionarios[editIndex].id}`, formData);
          const updatedFuncionarios = [...funcionarios];
          updatedFuncionarios[editIndex] = formData;
          setFuncionarios(updatedFuncionarios);
        } else {
          const response = await axios.post(API_URL, formData);
          setFuncionarios([...funcionarios, response.data]);
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
        setEditIndex(null);
        setShowForm(false);
      } catch (error) {
        console.error('Erro ao salvar funcionário:', error);
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(funcionarios[index]);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/${funcionarios[index].id}`);
      setFuncionarios(funcionarios.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cadastro de Funcionários</h2>
      <Button onClick={toggleForm} variant="primary" className="mb-3">
        {showForm ? 'Voltar para Lista' : 'Novo Funcionário'}
      </Button>

      {showForm ? (
        <Form onSubmit={handleSubmit}>
          {/* Campos do formulário */}
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
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario, index) => (
              <tr key={index}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
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

export default CadastroFuncionario;
