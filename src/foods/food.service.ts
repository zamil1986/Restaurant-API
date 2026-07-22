// handle the business logic for food-related operations
import {findAllFoods, findFoodById, insertFood, editFood, removeFood} from "./food.repository";

const getAllFoods = async () => {
    const foods = await findAllFoods();
    return foods;
};

const getFoodById = async (id: number) => {

    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }
    const food = await findFoodById(id);

    if (!food) {
        throw new Error("Food not found");
    }

    return food;
};

const postFood = async (name: string, price: number) => {
    if (!name || name.trim() === "") {
        throw new Error("Food name is required");
    }

    if (price === undefined || price === null) {
        throw new Error("Price is required");
    }

    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        throw new Error("Invalid price");
    }

    return await insertFood(name, price);
};
// edit food with required fields(all must be provided)
const putFood = async (
    id: number,
    name: string,
    price: number
) => {
    await getFoodById(id);

    if (!name || name.trim() === "") {
        throw new Error("Food name is required");
    }

    if (price === undefined || price === null) {
        throw new Error("Price is required");
    }

    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        throw new Error("Invalid price");
    }

    return await editFood(id, {
        food_name: name,
        price: price,
    });
};
// edit food with optional fields
const patchFood = async (
    id: number,
    name?: string,
    price?: number
) => {
    await getFoodById(id);

    const updateData: { food_name?: string; price?: number } = {};

    if (name !== undefined) {
        if (name.trim() === "") {
            throw new Error("Food name cannot be empty");
        }
        updateData.food_name = name;
    }

    if (price !== undefined) {
        if (typeof price !== "number" || isNaN(price) || price <= 0) {
            throw new Error("Invalid price");
        }
        updateData.price = price;
    }

    return await editFood(id, updateData);
};
const deleteFood = async (id: number) => {
    await getFoodById(id);
    return await removeFood(id);
};

export { getAllFoods, getFoodById, postFood, putFood, patchFood, deleteFood };