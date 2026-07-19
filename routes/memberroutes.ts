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

const memberroutes: express.Application = express();

memberroutes.get("/member", async (req: express.Request, res: express.Response) => {
  try {
    const members = await prisma.member_data.findMany();
    res.json({ members });
  } 
  catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

memberroutes.get("/member/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const [ member ] = await prisma.$connect().then(() => prisma.member_data.findMany({ where: { member_id: Number(id) } }));
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json({ member });
  } 
  catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

memberroutes.post("/member", async (req: express.Request, res: express.Response) => {
  try {
    const { age, name } = req.body;
    const  result  = await prisma.$connect().then(() => prisma.member_data.create({
      data: {
        age: age,
        name: name,
      },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

memberroutes.put("/member/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { age, name } = req.body;
    const result = await prisma.$connect().then(() => prisma.member_data.update({
      where: { member_id: Number(id) },
      data: {
        age: age,
        name: name,
      },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

memberroutes.delete("/member/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.$connect().then(() => prisma.member_data.delete({
      where: { member_id: Number(id) },
    }));
    res.json({ "result": result });
  } 
  catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default memberroutes;