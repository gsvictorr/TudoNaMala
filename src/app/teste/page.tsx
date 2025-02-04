
import { Logout } from "@/components/logout-button";
import Link from "next/link";

export default function Page() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Logout/>
        <Link href={'/'}>Voltar</Link>
    </div>
  )
}
