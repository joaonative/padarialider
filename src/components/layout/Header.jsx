"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
        <Link href={"/"} className="text-primary font-semibold text-2xl">
          LIDER
        </Link>
        <Link href={""}>Cardapio</Link>
      </nav>
      {!loggedIn ? (
        <nav className="flex items-center gap-4 text-gray-500">
          <Link
            href={"/login"}
            className=" text-gray-500 px-5 py-2 rounded-full font-semibold"
          >
            Entrar
          </Link>
          <Link
            href={"/register"}
            className="bg-primary text-white px-5 py-2 rounded-full font-semibold"
          >
            Cadastrar-se
          </Link>
        </nav>
      ) : (
        <nav>
          <button
            className="px-5 py-2 transition-all hover:bg-gray-600 hover:text-white"
            onClick={handleLogout}
          >
            Sair
          </button>
        </nav>
      )}
    </header>
  );
}
