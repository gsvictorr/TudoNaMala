import prisma from "@/prisma";
import { ListPlan } from "@prisma/client";


export async function createListFree(userId: number, name: string) {
    const userListsCount = await prisma.travelList.count({
        where: { ownerId: userId },
    });

    if (userListsCount >= 3) {
        throw new Error("Você atingiu o limite de 3 listas. Exclua alguma para criar outra.");
    }

    const list = await prisma.travelList.create({
        data: {
            name,
            plan: ListPlan.FREE,
            ownerId: userId
        },
    });

    return list;

}