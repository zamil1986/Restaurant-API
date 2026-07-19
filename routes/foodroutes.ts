import express from "express";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

const foodroutes: express.Application = express();

foodroutes.get("/food", async (req: express.Request, res: express.Response) => {
  try {
    const foods = await prisma.food_data.findMany();
    res.json({ foods });
  } 
  catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

foodroutes.get("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const [ food ] = await prisma.$connect().then(() => prisma.food_data.findMany({ where: { id_food: Number(id) } }));
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json({ food });
  } 
  catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

foodroutes.post("/food", async (req: express.Request, res: express.Response) => {
  try {
    const { name, types, price } = req.body;
    const  result  = await prisma.$connect().then(() => prisma.food_data.create({
      data: {
        food_name: name,
        types: types,
        price: price,
      },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

foodroutes.put("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await prisma.$connect().then(() => prisma.food_data.update({
      where: { id_food: Number(id) },
      data: {
        food_name: name,
        price: price,
      },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

foodroutes.delete("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.$connect().then(() => prisma.food_data.delete({
      where: { id_food: Number(id) },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default foodroutes;