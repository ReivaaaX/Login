import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors("http://localhost:5173"))

//POST
app.post("/cadastro", async (req, res) => {
  await prisma.User.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

//GET
app.get("/cadastro", async (req, res) => {
  let users = [];
if(req.query) {
  users = await prisma.user.findMany({
    where:{
      name:req.query.name
    }
  })
}else{
  users = await prisma.User.findMany();
}

  res.status(200).json(users);
});

//PUT
app.put("/cadastro/:id", async (req, res) => {
  await prisma.User.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

//DELETE
app.delete("/cadastro/:id", async (req, res) => {
  await prisma.User.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso" });
});

app.listen(5050, () => {
  console.log("conexão criada")
});