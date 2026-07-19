import express from "express";
import dotenv from "dotenv";
import foodroutes from "./routes/foodroutes";
import memberroutes from "./routes/memberroutes";


dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(foodroutes);
app.use(memberroutes);

//routes
app.get("/", async (req: express.Request, res: express.Response) => {
  res.json({ message: "Welcome to the Food API" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

