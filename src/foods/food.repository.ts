// communicate with the database 
import prisma from "../../prisma/db";

const findAllFoods = async () => {
    const foods = await prisma.food_data.findMany();
    return foods;
};

const findFoodById = async (id: number) => {
    const food = await prisma.food_data.findUnique({
        where: {
            id_food: id,
        },
    });
    return food;
}

const insertFood = async (name: string, price: number) => {
    const food = await prisma.food_data.create({
        data: {
            food_name: name,
            price: price,
        },
    });
    return food;
};

const editFood = async (
    id: number,
    data: { food_name?: string; price?: number }
) => {
    return prisma.food_data.update({
        where: { id_food: id },
        data,
    });
};

const removeFood = async (id: number) => {
    const food = await prisma.food_data.delete({
        where: { id_food: id },
      });
      return food;
};

export { findAllFoods, findFoodById, insertFood, editFood, removeFood };
