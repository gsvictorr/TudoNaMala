'use client';
import { Button } from "./ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export function Logout(){
    const user = useContext(AuthContext);

    return (
        <>
        <div className="flex flex-col">
        <h2>Oláa!! {user.user?.name}</h2>
        <h2>email: {user.user?.email}</h2>
        <Button onClick={user.signOut}>Logout</Button>
        </div>
        </>
    );
}