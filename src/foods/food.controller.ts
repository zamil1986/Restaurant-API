// 
import express from "express";
import { getAllFoods, getFoodById, postFood, patchFood, putFood, deleteFood } from "./food.service";

const foodroutes: express.Application = express();

foodroutes.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const foods = await getAllFoods();
    res.json(foods );
  }
  catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

foodroutes.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const food = await getFoodById(id);
        res.json(food);
    } 
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});


foodroutes.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const { name, price }: { name: string; price: number } = req.body;
        const result = await postFood(name, price);
        return res.status(201).json({
            result,
        });
    } 
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
foodroutes.put("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const result = await putFood(Number(id), name, price);
    res.json({ "Successfully updated": result });
  } 
  catch (error) {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Internal Server Error",
    });
}
});
foodroutes.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await patchFood(Number(id), name, price);
    res.json({ "Successfully updated": result });
  } 
  catch (error) {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Internal Server Error",
    });
}
});   

foodroutes.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await deleteFood(Number(id));
    res.json({ "Food deleted": result });
  } 
  catch (error) {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Internal Server Error",
    });
}
});

export default foodroutes;