import express from "express";
import db from "./src/config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";


const app: express.Application = express();

app.use(express.json());
async function testConnection() {
  try {
    const connection = await db.getConnection();

    console.log("Connected to MySQL!");

    connection.release();
  } catch (error) {
    console.error("Failed to connect to MySQL");
    console.error(error);
  }
}

testConnection();
//routes
app.get("/food", async (req: express.Request, res: express.Response) => {
  try {
    const [food] = await db.query<RowDataPacket[]>("SELECT * FROM food_data");
    res.json({ message: "GET all food", food });
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const [ food ] = await db.query<RowDataPacket[]>("SELECT * FROM food_data WHERE id_food = ?", [id]);
    if (food.length === 0 || !food) {
      res.status(404).json({ error: "Food not found" });
    } else {
      res.json({ message: "GET food id=" + id, food });
    }
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/food", async (req: express.Request, res: express.Response) => {
  try {
    const { name, types, price } = req.body;
    const [result] = await db.query<ResultSetHeader>("INSERT INTO food_data (food_name, types, price) VALUES (?, ?, ?)", [name, types, price]);
    res.json({ message: "POST food", food: { id: result.insertId, name, types, price } });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    await db.query("UPDATE food_data SET food_name = ?, price = ? WHERE id_food = ?", [name, price, id]);
    res.json({ message: "PUT food id=" + id + ", name=" + name + ", price=" + price });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/food/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM food_data WHERE id_food = ?", [id]);
    res.json({ message: "DELETE food id=" + id });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

