'use client';
import { TravelList } from "@/app/api/travelList/route";
import { AuthContext } from "@/context/auth-context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";


interface UserLists {
    ownedLists: TravelList[];
    sharedLists: TravelList[];
}

export default function DashTeste() {
    const [lists, setLists] = useState<UserLists | null>(null);
    const user = useContext(AuthContext);

    useEffect(() => {
        async function fetchLists() {
            if (!user?.user?.userId) return; // Garante que o usuário está carregado
    
            try {
                const response = await axios.get(`/api/travelList`, {
                    headers: {
                        Authorization: `Bearer ${user.recoveryToken()}`, // Pega o token dos cookies
                    },
                });
                setLists(response.data);
            } catch (error) {
                console.error("Erro ao buscar listas:", error);
            }
        }
    
        fetchLists();
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Minhas Listas</h1>

            <h2 className="mt-4 font-semibold">Listas Criadas</h2>
            {lists?.ownedLists.length ? (
                lists.ownedLists.map((list) => <div key={list.id}>{list.name}</div>)
            ) : (
                <p>Você ainda não criou nenhuma lista.</p>
            )}

            <h2 className="mt-4 font-semibold">Listas Compartilhadas</h2>
            {lists?.sharedLists.length ? (
                lists.sharedLists.map((list) => <div key={list.id}>{list.name}</div>)
            ) : (
                <p>Nenhuma lista compartilhada com você.</p>
            )}
        </div>
    );
}
