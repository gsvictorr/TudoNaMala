import { getUserLists } from "@/services/travelListService";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


export interface ListItem {
    id: number;
    name: string;
    category: string;
    isCompleted: boolean;
    quantity: number;
  }
  
  export interface TravelList {
    id: number;
    name: string;
    plan: "FREE" | "PREMIUM";
    createdAt: string;
    items: ListItem[];
  }
  
  export interface SharedAccess {
    id: number;
    userId: number;
    travelList: TravelList;
  }

  export async function GET(request: NextRequest) {
    try {
        // Pegando o token do cabeçalho
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (!payload || !payload.userId) {
            return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
        }

        const userId = Number(payload.userId);

        const lists = await getUserLists(userId);
        return NextResponse.json(lists);
    } catch (error) {
        console.error("Erro ao buscar listas:", error);
        return NextResponse.json({ error: "Erro ao buscar listas." }, { status: 500 });
    }
}
