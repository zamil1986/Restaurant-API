import express from "express";
import dotenv from "dotenv";
import foodroutes from "./src/foods/food.controller";

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use("/foods", foodroutes);

//routes
app.get("/", async (req: express.Request, res: express.Response) => {
  res.json({ message: "Welcome to the Food API" });
});

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

