const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let funcionarios = [];

app.post('/funcionarios', (req, res) => {
  const funcionario = req.body;
  funcionarios.push(funcionario);
  res.status(201).json(funcionario);
});


app.get('/funcionarios', (req, res) => {
  res.json(funcionarios);
});


app.put('/funcionarios/:id', (req, res) => {
  const { id } = req.params;
  const updatedFuncionario = req.body;
  funcionarios[id] = updatedFuncionario;
  res.json(updatedFuncionario);
});


app.delete('/funcionarios/:id', (req, res) => {
  const { id } = req.params;
  funcionarios.splice(id, 1);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
