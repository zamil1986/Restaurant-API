// handle the business logic for drink-related operations
import {
    findAllDrinks,
    findDrinkById,
    insertDrink,
    editDrink,
    removeDrink,
} from "./drink.repository";

const getAllDrinks = async () => {
    return await findAllDrinks();
};

const getDrinkById = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }

    const drink = await findDrinkById(id);

    if (!drink) {
        throw new Error("Drink not found");
    }

    return drink;
};

const postDrink = async (name: string, price: number) => {
    if (!name || name.trim() === "") {
        throw new Error("Drink name is required");
    }

    if (price === undefined || price === null) {
        throw new Error("Price is required");
    }

    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        throw new Error("Invalid price");
    }

    return await insertDrink(name, price);
};

// edit drink with required fields (all must be provided)
const putDrink = async (id: number, name: string, price: number) => {
    await getDrinkById(id);

    if (!name || name.trim() === "") {
        throw new Error("Drink name is required");
    }

    if (price === undefined || price === null) {
        throw new Error("Price is required");
    }

    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        throw new Error("Invalid price");
    }

    return await editDrink(id, {
        drink_name: name,
        price,
    });
};

// edit drink with optional fields
const patchDrink = async (id: number, name?: string, price?: number) => {
    await getDrinkById(id);

    const updateData: { drink_name?: string; price?: number } = {};

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Drink name cannot be empty");
        }
        updateData.drink_name = name;
    }

    if (price !== undefined) {
        if (typeof price !== "number" || isNaN(price) || price <= 0) {
            throw new Error("Invalid price");
        }
        updateData.price = price;
    }

    return await editDrink(id, updateData);
};

const deleteDrink = async (id: number) => {
    await getDrinkById(id);
    return await removeDrink(id);
};

export { getAllDrinks, getDrinkById, postDrink, putDrink, patchDrink, deleteDrink };
