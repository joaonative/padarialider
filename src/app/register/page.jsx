"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [err, setErr] = useState(false);

  const API_URL = "http://localhost:8080";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    setErr(false);
    setUserCreated(false);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        console.error(
          "Erro na solicitação:",
          response.status,
          response.statusText
        );
        setErr(true);
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      setErr(true);
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-4xl mb-4">Cadastre-se</h1>
      {userCreated && (
        <div className="my-4 text-center font-semibold">
          Usuario criado! Agora voce pode{" "}
          <Link href={"/login"} className="underline text-primary">
            logar &raquo;
          </Link>
        </div>
      )}
      {err && (
        <div className="my-4 text-center font-semibold">
          {" "}
          Erro ao cadastrar. Tente novamente mais tarde.{" "}
        </div>
      )}
      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={creatingUser}
          type="email"
          placeholder="email:"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          disabled={creatingUser}
          type="password"
          placeholder="senha:"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Registrar
        </button>
        <div className="my-4 text-center text-gray-500">
          Ou entre com algum provedor
        </div>
        <button className="flex gap-4 items-center justify-center">
          <Image src={"/google.png"} alt="" width={24} height={24} />
          Entrar com Google
        </button>
        <div className="mt-4 font-thin text-center">
          Ja possui uma conta? Faca login{" "}
          <Link href={"/login"} className="text-primary underline font-medium">
            aqui
          </Link>
        </div>
      </form>
    </section>
  );
}
