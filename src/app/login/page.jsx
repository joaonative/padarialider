"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
    setError(null);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      router.replace("/");
    } else {
      const { error } = await response.json();
      setError(error);
    }

    setLoginInProgress(false);
  }

  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-4xl mb-4">Entrar</h1>
      {error && <div className="my-4 text-center font-semibold">{error}</div>}
      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          disabled={loginInProgress}
          type="email"
          placeholder="email:"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          name="password"
          disabled={loginInProgress}
          type="password"
          placeholder="senha:"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Entrar
        </button>
        <div className="my-4 text-center text-gray-500">
          Ou entre com algum provedor
        </div>
        <button className="flex gap-4 items-center justify-center">
          <Image src={"/google.png"} alt="" width={24} height={24} />
          Entrar com Google
        </button>
        <div className="mt-4 font-thin text-center">
          Nao possui uma conta? Crie-a{" "}
          <Link href={"/login"} className="text-primary underline font-medium">
            aqui
          </Link>
        </div>
      </form>
    </section>
  );
}
