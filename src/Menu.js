import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Menu({ user, onLogout }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Bem-vindo, {user}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cadastro">Cadastro Cliente</Nav.Link>
          <Nav.Link as={Link} to="/cadastro-fornecedor">Cadastro Fornecedor</Nav.Link>
          <Nav.Link as={Link} to="/cadastro-funcionario">Cadastro Funcionário</Nav.Link>
          <Nav.Link as={Link} to="/cadastro-veiculo">Cadastro Veículo</Nav.Link>
        </Nav>
        <Button variant="outline-danger" onClick={onLogout}>Sair</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
