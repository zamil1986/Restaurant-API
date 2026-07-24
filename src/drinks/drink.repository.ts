// communicate with the database
import prisma from "../../prisma/db";

const findAllDrinks = async () => {
    return await prisma.drink_data.findMany();
};

const findDrinkById = async (id: number) => {
    return await prisma.drink_data.findUnique({
        where: {
            id_drink: id,
        },
    });
};

const insertDrink = async (name: string, price: number) => {
    return await prisma.drink_data.create({
        data: {
            drink_name: name,
            price,
        },
    });
};

const editDrink = async (
    id: number,
    data: { drink_name?: string; price?: number }
) => {
    return await prisma.drink_data.update({
        where: { id_drink: id },
        data,
    });
};

const removeDrink = async (id: number) => {
    return await prisma.drink_data.delete({
        where: { id_drink: id },
    });
};

export { findAllDrinks, findDrinkById, insertDrink, editDrink, removeDrink };
