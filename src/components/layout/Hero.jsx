import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          A melhor <br />
          <span className="text-primary">padaria</span> da cidade
        </h1>
        <p className="mt-6 text-gray-500">
          Mais de 20 anos no mercado de Indaiatuba proporcionando felicidade e
          seguranca no seu dia a dia.
        </p>
        <div className="flex gap-4 mt-4">
          <button className="bg-primary text-white px-5 py-2 rounded-full flex gap-2 uppercase items-center text-md">
            Pedir agora
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold text-md items-center">
            Saiba mais
            <Right />
          </button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/paes.png"}
          alt={"paes"}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
}
