import express from "express";
import {
    getAllDrinks,
    getDrinkById,
    postDrink,
    putDrink,
    patchDrink,
    deleteDrink,
} from "./drink.service";

const drinkRoutes: express.Application = express();

drinkRoutes.get("/", async (_req: express.Request, res: express.Response) => {
    try {
        const drinks = await getAllDrinks();
        return res.json(drinks);
    } catch (error) {
        console.error("Error fetching drinks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

drinkRoutes.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const drink = await getDrinkById(Number(req.params.id));
        return res.json(drink);
    } catch (error) {
        return handleError(error, res);
    }
});

drinkRoutes.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const { name, price }: { name: string; price: number } = req.body;
        const result = await postDrink(name, price);
        return res.status(201).json({ result });
    } catch (error) {
        return handleError(error, res);
    }
});

drinkRoutes.put("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const { name, price }: { name: string; price: number } = req.body;
        const result = await putDrink(Number(req.params.id), name, price);
        return res.json({ "Successfully updated": result });
    } catch (error) {
        return handleError(error, res);
    }
});

drinkRoutes.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const { name, price }: { name?: string; price?: number } = req.body;
        const result = await patchDrink(Number(req.params.id), name, price);
        return res.json({ "Successfully updated": result });
    } catch (error) {
        return handleError(error, res);
    }
});

drinkRoutes.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const result = await deleteDrink(Number(req.params.id));
        return res.json({ "Drink deleted": result });
    } catch (error) {
        return handleError(error, res);
    }
});

const handleError = (error: unknown, res: express.Response) => {
    if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
};

export default drinkRoutes;
