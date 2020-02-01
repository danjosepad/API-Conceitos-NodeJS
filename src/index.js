const express = require("express");

const server = express(); // Exportação da função Express

server.use(express.json());

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Method: ${req.method} URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function validateName(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: "Name does not exist" });
  }

  return next();
}

function validadeId(req, res, next) {
  const { id } = req.params;

  const findUser = users.find(User => User.id === parseInt(id));

  if (!findUser) {
    return res.status(400).send({ error: "User does not exist" });
  }

  req.id = id;

  return next();
}

// Query params = ?teste=1
server.get("/query", (req, res) => {
  const { usuario } = req.query;

  return res.json({ message: `Bem-vindo ${usuario}` });
});
// -----------------------

// Route params = /users/1
server.get("/route/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Seu número de usuário é: ${id}` });
});

// -----------------------

// CRUD

// O CRUD será realizado com base na variável a seguir

let users = [
  {
    id: 1,
    name: "Daniel"
  },
  {
    id: 2,
    name: "Ramon"
  },
  {
    id: 3,
    name: "Diego"
  }
];

// Lista todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});
// -----------------

// Lista um usuário
server.get("/users/:id", validadeId, (req, res) => {
  const findUser = users.find(User => User.id === parseInt(req.id));

  return res.json(findUser);
});
// -----------------

// Cria um novo usuário
server.post("/users", validateName, (req, res) => {
  const { name, id } = req.body;

  const user = {
    id,
    name
  };

  users = [...users, user];

  return res.json(users);
});
// -----------------

// Edita usuário existente
server.put("/users/:id", validadeId, validateName, (req, res) => {
  const { name } = req.body;

  const index = users.findIndex(User => User.id === parseInt(req.id));

  users[index].name = name;

  return res.json(users);
});
// -----------------

// Deleta usuário existente
server.delete("/users/:id", validadeId, (req, res) => {
  const index = users.findIndex(User => User.id === parseInt(req.id));

  users.splice(index, 1);

  return res.json(users);
});
// -----------------

server.listen(3000); // Faz com que o servidor ouça a porta 3000, sendo localhost:3000
