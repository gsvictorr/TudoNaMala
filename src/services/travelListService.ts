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

export async function getUserLists(userId: number) {
    const ownedLists = await prisma.travelList.findMany({
      where: { ownerId: userId },
      include: { items: true }, // Inclui os itens da lista (opcional)
    });
  
    // Busca listas compartilhadas com o usuário
    const sharedLists = await prisma.sharedAccess.findMany({
      where: { userId },
      include: { travelList: { include: { items: true } } }, // Inclui os itens da lista (opcional)
    });
  
    // Formata para retornar os dados de forma organizada
    return {
      ownedLists,
      sharedLists: sharedLists.map((shared) => shared.travelList),
    };
  }